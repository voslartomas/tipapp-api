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
    const teamResponse = await request.get('https://statsapi.web.nhl.com/api/v1/teams/')
    teamResponse.body.teams.forEach(async teamResponseItem => {
      const dbTeam = await this.database.models.Team.findOne({where: {externalId: teamResponseItem.id}})
      if (!dbTeam) {
        const team: any = {}
        team.name = teamResponseItem.name
        team.nickname = teamResponseItem.teamName
        team.shortcut = teamResponseItem.abbreviation
        team.externalId = teamResponseItem.id
        team.sportId = 2
        const dbTeam = await this.database.models.Team.create(team)

        const leagueTeam: any = {}
        // const dbTeam = await this.database.models.Team.findOne({where: {externalId: item.id}})
        leagueTeam.teamId = dbTeam.id
        leagueTeam.leagueId = leagueId
        this.database.models.LeagueTeam.create(leagueTeam)
      }
    })
    const playerResponse = await request.get('https://statsapi.web.nhl.com/api/v1/teams/')
    playerResponse.body.teams.forEach(async teamItem => {
      const playerRoster = await request.get(`https://statsapi.web.nhl.com/api/v1/teams/${teamItem.id}/roster`)
      playerRoster.body.roster.forEach(async playerRosterItem => {
        const dbPlayer = await this.database.models.Player.findOne({where: {externalId: playerRosterItem.person.id}})
        if (!dbPlayer) {
          const player: any = {}
          player.firstName = playerRosterItem.person.fullName
          player.lastName = ''
          player.isActive = true
          player.externalId = playerRosterItem.person.id
          const dbPlayer = await this.database.models.Player.create(player)

          const dbTeam = await this.database.models.Team.findOne({ where: { externalId: teamItem.id } })
          const dbLeagueTeam = await this.database.models.LeagueTeam.findOne({ where: { teamId: dbTeam.id, leagueId } })

          const leaguePlayer: any = {}
          leaguePlayer.leagueTeamId = dbLeagueTeam.id
          leaguePlayer.playerId = dbPlayer.id
          leaguePlayer.bestScorer = false
          this.database.models.LeaguePlayer.create(leaguePlayer)
        }
      })
    })
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
    const today = new Date().toISOString().split('T')[0]
    const response = await request.get(`https://statsapi.web.nhl.com/api/v1/schedule?startDate=2018-04-10&endDate=${today}&expand=schedule.linescore,schedule.scoringplays`)

    const days = response.body.dates
    for (const index in days) {
      const dateDetail = days[index]

      dateDetail.games.forEach(async game => {
        let dbMatch = await this.database.models.Match.findOne({ where: { externalId: game.gamePk } })

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

          dbMatch = this.database.models.Match.create(match)
        } else {
          const match: any = {}
          match.homeScore = game.teams.home.score
          match.awayScore = game.teams.away.score
          match.overtime = game.linescore.currentPeriod > 3

          dbMatch.update(match)
        }

        // update match bets
        this.betEvaluator.updateMatchBets(dbMatch)

        const scorers = await this.database.models.MatchScorer.findAll({ where: { matchId: dbMatch.id } })
        if (scorers.length === 0) {
          game.scoringPlays.forEach(async play => {
            try {
              const externalId = play.players[0].player.id
              const dbPlayer = await this.database.models.Player.findOne({ where: { externalId } })
              const leaguePlayer = await this.database.models.LeaguePlayer.findOne({
                where: { playerId: dbPlayer.id },
                include: [{model: this.database.models.LeagueTeam, required: true, where: {leagueId}}]
              })

              const scorer = {
                matchId: dbMatch.id,
                scorerId: leaguePlayer.id,
                numberOfGoals: 1
              }

              this.database.models.MatchScorer.create(scorer)
            } catch (e) {
              console.log(e)
            }
          })
        }
      })
    }

    return `https://statsapi.web.nhl.com/api/v1/schedule?startDate=2018-04-10&endDate=${today}&expand=schedule.linescore,schedule.scoringplays`
  }

  private async getLeagueTeam(externalId: number, leagueId: number) {
    const dbTeam = await this.database.models.Team.findOne({ where: { externalId} })

    return this.database.models.LeagueTeam.findOne({ where: { teamId: dbTeam.id, leagueId } })
  }

}
