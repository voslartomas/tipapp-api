import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import Team from '../models/team.model'
import { ITeam } from '../types/models.d'

@Path('/api/teams')
export default class TeamsController {

  @Inject
  private database: Database

  @GET
  async getTeams(): Promise<ITeam[]> {
    return await this.database.models.Team.findAll({})
  }

  @GET
  @Path(':id')
  async getTeam(@PathParam('id') teamId: number): Promise<ITeam> {
    try {
      const team = await this.database.models.Team.findById(teamId)

      if (!team) {
        throw new Error('not found')
      }

      return team
    } catch (e) {
      throw new Errors.NotFoundError('Team not found.')
    }
  }

  @POST
  async createTeam(team: any): Promise<ITeam> {
    return await this.database.models.Team.create(team)
  }

  @PUT
  @Path(':id')
  async updateTeam(@PathParam('id') teamId: number, team: any): Promise<ITeam> {
    const dbSport = await this.database.models.Team.findById(teamId)

    if (dbSport) {
      return await dbSport.update(team)
    } else {
      return await this.database.models.Team.create(team)
    }
  }

  @DELETE
  @Path(':id')
  async deleteTeam(@PathParam('id') teamId: number): Promise<void> {
    const dbSport = await this.database.models.Team.findById(teamId)

    if (dbSport) {
      await dbSport.destroy()
    }
  }

}
