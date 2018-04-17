import * as request from 'superagent'
import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import Team from '../models/team.model'

@Path('/api/leagues/import/nhl')
export default class NHLTeamsController {

  @Inject
  private database: Database

  @GET
  async createNHLTeams() {
    const response = await request.get('https://statsapi.web.nhl.com/api/v1/teams/')
    response.body.teams.forEach(item => {
      const team: any = {}
      team.name = item.name
      team.nickname = item.teamName
      team.shortcut = item.abbreviation
      team.sportId = 2
      this.database.models.Team.create(team)
    })
  }

  @GET
  @Path('/all')
  async getNHLTeams() {
    const response = await request.get('https://statsapi.web.nhl.com/api/v1/teams/')
    return response.body.teams
  }

}