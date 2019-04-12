import * as request from 'superagent'
import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import Team from '../models/team.model'
import Player from '../models/player.model'
import LeagueTeam from '../models/leagueTeam.model'
import LeaguePlayer from '../models/leaguePlayer.model'
import BetEvaluator from '../services/betEvaluator'

@Path('/api/leagues/import/nhl')
export default class NHLController {

  @Inject
  private database: Database

  @Inject
  private betEvaluator: BetEvaluator

  @GET
  @Path('/:leagueId/')
  async importNHL(@PathParam('leagueId') leagueId: number) {
    try {
      const teamResponse = await request.get('https://statsapi.web.nhl.com/api/v1/teams/')
      for (const teamResponseItem of teamResponse.body.teams) {
        const dbTeam = await this.database.models.Team.findOne({where: {externalId: (teamResponseItem as any).id}})
        if (!dbTeam) {
          const team: any = {}
          team.name = (teamResponseItem as any).name
          team.nickname = (teamResponseItem as any).teamName
          team.shortcut = (teamResponseItem as any).abbreviation
          team.externalId = (teamResponseItem as any).id
          team.sportId = 2
          const dbTeam = await this.database.models.Team.create(team)
        }

        const leagueTeam: any = {}
        const dbLeagueTeam = await this.database.models.LeagueTeam.findOne({where: { teamId: dbTeam && dbTeam.id, leagueId }})
        if (!dbLeagueTeam) {
          leagueTeam.teamId = dbTeam.id
          leagueTeam.leagueId = leagueId
          this.database.models.LeagueTeam.create(leagueTeam)
        }
      }

      let numberOfPlayers = 0
      const playerResponse = await request.get('https://statsapi.web.nhl.com/api/v1/teams/')
      for (const teamItem of playerResponse.body.teams) {
        const playerRoster = await request.get(`https://statsapi.web.nhl.com/api/v1/teams/${(teamItem as any).id}/roster`)
        const dbTeam = await this.database.models.Team.findOne({ where: { externalId: (teamItem as any).id } })
        const dbLeagueTeam = await this.database.models.LeagueTeam.findOne({ where: { teamId: dbTeam.id, leagueId } })
        numberOfPlayers += playerRoster.body.roster.length
        for (const playerRosterItem of playerRoster.body.roster) {
          let dbPlayer
          try {
            dbPlayer = await this.database.models.Player.findOne({where: {externalId: (playerRosterItem as any).person.id}})
            if (!dbPlayer) {
              const player: any = {}
              player.firstName = (playerRosterItem as any).person.fullName
              player.lastName = ''
              player.isActive = true
              player.externalId = (playerRosterItem as any).person.id
              dbPlayer = await this.database.models.Player.create(player)
            }

            const dbLeaguePlayer = await this.database.models.LeaguePlayer.findOne({ where: { leagueTeamId: dbLeagueTeam.id, playerId: dbPlayer.id } })

            if (!dbLeaguePlayer) {
              const leaguePlayer: any = {}
              leaguePlayer.leagueTeamId = dbLeagueTeam.id
              leaguePlayer.playerId = dbPlayer.id
              leaguePlayer.bestScorer = false
              leaguePlayer.secondBestScorer = false
              leaguePlayer.thirdBestScorer = false
              leaguePlayer.fourthBestScorer = false
              await this.database.models.LeaguePlayer.create(leaguePlayer)
            }
          } catch (err) {
            console.log(err)
          }

          // get stats
          const playerStats = await request.get(`https://statsapi.web.nhl.com${(playerRosterItem as any).person.link}?expand=person.stats&stats=yearByYear&expand=stats.team`)
          const playerPlayoffStats = await request.get(`https://statsapi.web.nhl.com${(playerRosterItem as any).person.link}?expand=person.stats&stats=yearByYearPlayoffs&expand=stats.team`)

          const regularStats = this.getStats(playerStats)
          const playoffStats = this.getStats(playerPlayoffStats)

          const player = await this.database.models.LeaguePlayer.findOne({ where: { leagueTeamId: dbLeagueTeam.id, playerId: dbPlayer.id } }) as LeaguePlayer

          await player.update({
            playoffGames: playoffStats && playoffStats.games,
            playoffGoals: playoffStats && playoffStats.goals,
            playoffAssists: playoffStats && playoffStats.assists,
            seasonGames: regularStats && regularStats.games,
            seasonGoals: regularStats && regularStats.goals,
            seasonAssists: regularStats && regularStats.assists
          })
        }
        const bestScorer = await this.database.models.LeaguePlayer.findOne({ where: { leagueTeamId: dbLeagueTeam.id, seasonGoals: { [ this.database.Op.gte ]: 0 }  }, order: [ [ 'seasonGoals', 'DESC' ] ] }) as LeaguePlayer
        // await this.database.models.LeaguePlayer.update({ bestScorer: false }, { where: { leagueTeamId: dbLeagueTeam.id } })
        await bestScorer.update({
          bestScorer: true
        })
        console.log(`Best scorer for ${dbTeam.name} is ${bestScorer.playerId}`)
      }

      console.log('Number of players: ' + numberOfPlayers)
    } catch (err) {
      console.log(err)
    }

  }

  private getStats (stats) {
    const length = stats.body.people[0].stats[0].splits.length
    return stats.body.people[0].stats[0].splits[length - 1] && stats.body.people[0].stats[0].splits[length - 1].stat
  }

  @GET
  @Path('/all')
  async getNHLTeams() {
    const response = await request.get('https://statsapi.web.nhl.com/api/v1/teams/')
    return response.body.teams
  }

  @GET
  @Path('/:leagueId/matches')
  async importMatches(@PathParam('leagueId') leagueId: number) {
    let today: any = new Date()
    // today.setDate(new Date().getDate() + 1)
    today = today.toISOString().split('T')[0]
    const response = await request.get(`https://statsapi.web.nhl.com/api/v1/schedule?startDate=2019-04-07&endDate=${today}&expand=schedule.linescore,schedule.scoringplays`)

    const days = response.body.dates
    for (const index in days) {
      const dateDetail = days[index]
      // dateDetail.games.forEach(async game => {
      for (const game of dateDetail.games) {
        let dbMatch = await this.database.models.Match.findOne({ where: { externalId: game.gamePk, leagueId } })

        if (!dbMatch) {
          const dbHomeTeam = await this.getLeagueTeam(game.teams.home.team.id, leagueId)
          const dbAwayTeam = await this.getLeagueTeam(game.teams.away.team.id, leagueId)
          const match = {
            leagueId,
            dateTime: game.gameDate,
            homeTeamId: dbHomeTeam.id,
            awayTeamId: dbAwayTeam.id,
            homeScore: game.teams.home.score,
            awayScore: game.teams.away.score,
            externalId: game.gamePk,
            overtime: game.linescore.currentPeriod > 3
          }

          dbMatch = await this.database.models.Match.create(match)
        } else {
          const match: any = {}
          match.homeScore = game.teams.home.score
          match.awayScore = game.teams.away.score
          match.overtime = game.linescore.currentPeriod > 3

          dbMatch.update(match)
        }

        const scorers = await this.database.models.MatchScorer.findAll({ where: { matchId: dbMatch.id } })
        if (scorers.length === 0) {
          for (const play of game.scoringPlays) {
            try {
              const externalId = play.players[0].player.id
              const dbPlayer = await this.database.models.Player.findOne({ where: { externalId } })
              if (!dbPlayer) {
                const player: any = {}
                player.firstName = play.players[0].player.fullName
                player.lastName = ''
                player.isActive = true
                player.externalId = play.players[0].player.id
                const dbPlayer = await this.database.models.Player.create(player)
              }
              let leaguePlayer = await this.database.models.LeaguePlayer.findOne({
                where: { playerId: dbPlayer.id },
                include: [{model: this.database.models.LeagueTeam, required: true, where: {leagueId}}]
              })

              if (!leaguePlayer) {
                const dbTeam = await this.database.models.Team.findOne({ where: { externalId: play.team.id } })
                const dbLeagueTeam = await this.database.models.LeagueTeam.findOne({ where: { teamId: dbTeam.id, leagueId } })
                leaguePlayer = {}
                leaguePlayer.leagueTeamId = dbLeagueTeam.id
                leaguePlayer.playerId = dbPlayer.id
                leaguePlayer.bestScorer = false
                leaguePlayer.secondBestScorer = false
                leaguePlayer.thirdBestScorer = false
                leaguePlayer.fourthBestScorer = false
                leaguePlayer = await this.database.models.LeaguePlayer.create(leaguePlayer)
              }

              const scorer = {
                matchId: dbMatch.id,
                scorerId: leaguePlayer.id,
                numberOfGoals: 1
              }

              await this.database.models.MatchScorer.create(scorer)
            } catch (e) {
              console.log(e, play.players)
            }
          }
        }

        // update match bets
        await this.betEvaluator.updateMatchBets(dbMatch)
      }
    }

    return `https://statsapi.web.nhl.com/api/v1/schedule?startDate=2019-04-07&endDate=${today}&expand=schedule.linescore,schedule.scoringplays`
  }

  private async getLeagueTeam(externalId: number, leagueId: number) {
    const dbTeam = await this.database.models.Team.findOne({ where: { externalId} })

    return this.database.models.LeagueTeam.findOne({ where: { teamId: dbTeam.id, leagueId } })
  }

}
