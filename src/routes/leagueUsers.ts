import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import LeagueUser from '../models/leagueUser.model'
import { ILeagueUser } from '../types/models.d'

@Path('/api/league-users')
export default class LeagueUserController {

    @Inject
    private database: Database

    @GET
    async getLeagueUsers(): Promise<ILeagueUser[]> {
        return await this.database.models.LeagueUser.findAll({})
    }

    @GET
    @Path(':id')
    async getLeagueUser(@PathParam('id') leagueUserId: number): Promise<ILeagueUser> {
        try {
            const leagueUser = await this.database.models.LeagueUser.findById(leagueUserId)

            if (!leagueUser) {
                throw new Error('not found')
            }

            return leagueUser
        } catch (e) {
            throw new Errors.NotFoundError('User special bet serie not found.')
        }
    }

    @POST
    async createLeagueUser(leagueUser: any): Promise<ILeagueUser> {
        return await this.database.models.LeagueUser.create(leagueUser)
    }

    @PUT
    @Path(':id')
    async updateLeagueUser(@PathParam('id') leagueUserId: number, leagueUser: any): Promise<ILeagueUser> {
        const dbLeagueUser = await this.database.models.LeagueUser.findById(leagueUserId)

        if (dbLeagueUser) {
            return await dbLeagueUser.update(leagueUser)
        } else {
            return await this.database.models.LeagueUser.create(leagueUser)
        }
    }

    @DELETE
    @Path(':id')
    async deleteLeagueUser(@PathParam('id') leagueUserId: number): Promise<void> {
        const dbLeagueUser = await this.database.models.LeagueUser.findById(leagueUserId)

        if (dbLeagueUser) {
            await dbLeagueUser.destroy()
        }
    }

}
