import * as request from 'superagent'
import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import Team from '../models/team.model'
import Player from '../models/player.model'
import LeagueTeam from '../models/leagueTeam.model'
import LeaguePlayer from '../models/leaguePlayer.model'

@Path('/api/leagues/import/nhl')
export default class NHLController {

  @Inject
  private database: Database

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

}