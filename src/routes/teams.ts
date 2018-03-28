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
    async getTeam(@PathParam('id') teamID: number): Promise<ITeam> {
        try {
        const user = await this.database.models.Team.findById(teamID)

        if (!user) {
            throw new Error('not found')
        }

        return user
        } catch (e) {
        throw new Errors.NotFoundError('User not found.')
        }
    }

    @POST
    // TODO fix user: IUser, error while running tests
    async createTeam(team: any): Promise<ITeam> {
        return await this.database.models.Team.create(team)
    }

    @PUT
    @Path(':id')
    async updateTeam(@PathParam('id') teamID: number, team: any): Promise<ITeam> {
        const dbSport = await this.database.models.Team.findById(teamID)

        if (dbSport) {
        return await dbSport.update(team)
        } else {
        return await this.database.models.Team.create(team)
        }
    }

    @DELETE
    @Path(':id')
    async deleteTeam(@PathParam('id') teamID: number): Promise<void> {
        const dbSport = await this.database.models.Team.findById(teamID)

        if (dbSport) {
        await dbSport.destroy()
        }
    }

}