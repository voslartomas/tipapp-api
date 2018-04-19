import * as request from 'superagent'
import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import Team from '../models/team.model'
import Player from '../models/player.model'

@Path('/api/leagues/import/nhl')
export default class NHLTeamsController {

  @Inject
  private database: Database

  @GET
  async createNHLTeams() {
    const response = await request.get('https://statsapi.web.nhl.com/api/v1/teams/')
    response.body.teams.forEach(async item => {
      const dbTeam = await this.database.models.Team.findOne({where: {externalId: item.id}})
      if (!dbTeam) {
        const team: any = {}
        team.name = item.name
        team.nickname = item.teamName
        team.shortcut = item.abbreviation
        team.externalId = item.id
        team.sportId = 2
        this.database.models.Team.create(team)
      }
    })
  }

  @GET
  @Path('/players')
  async createNHLPlayers() {
    const response = await request.get('https://statsapi.web.nhl.com/api/v1/teams/')
    response.body.teams.forEach(async item => {
      const playerRoster = await request.get(`https://statsapi.web.nhl.com/api/v1/teams/${item.id}/roster`)
      playerRoster.body.roster.forEach(async item => {
        const dbPlayer = await this.database.models.Player.findOne({where: {externalId: item.person.id}})
        if (!dbPlayer) {
          const player: any = {}
          player.firstName = item.person.fullName
          player.lastName = ''
          player.isActive = true
          player.externalId = item.person.id
          this.database.models.Player.create(player)
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