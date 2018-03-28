import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import Match from '../models/match.model'
import { IBettingLeague } from '../types/models.d'
import async from '../utils/dbDataSync'

@Path('/api/betLeagues')
export default class BetLeaguesController {
    @Inject
    private database: Database

    @GET
    async getBetLeagues(): Promise<IBettingLeague[]> {
        return await this.database.models.BettingLeague.findAll({})
    }

    @GET
    @Path(':id')
    async getBetLeague(@PathParam('id') betId: number): Promise<IBettingLeague> {
        try {
        const user = await this.database.models.BettingLeague.findById(betId)

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
    async createBetLeague(bet: any): Promise<IBettingLeague> {
        return await this.database.models.User.create(bet)
    }

    @PUT
    @Path(':id')
    async updateBetLeague(@PathParam('id') betId: number, bet: any): Promise<IBettingLeague> {
        const dbUser = await this.database.models.User.findById(betId)

        if (dbUser) {
        return await dbUser.update(bet)
        } else {
        return await this.database.models.User.create(bet)
        }
    }

    @DELETE
    @Path(':id')
    async deleteBetLeague(@PathParam('id') betId: number): Promise<void> {
        const dbUser = await this.database.models.User.findById(betId)

        if (dbUser) {
        await dbUser.destroy()
        }
    }

}