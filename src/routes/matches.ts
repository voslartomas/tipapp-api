import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import Match from '../models/match.model'
import { IMatch } from '../types/models.d'

@Path('/api/matches')
export default class MachesController {
    @Inject
    private database: Database

    @GET
    async getMatches(): Promise<IMatch[]> {
      return await this.database.models.Match.findAll({})
    }

    @GET
    @Path(':id')
    async getMatch(@PathParam('id') matchId: number): Promise<IMatch> {
        try {
        const user = await this.database.models.Match.findById(matchId)

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
    async createMatch(match: any): Promise<IMatch> {
        return await this.database.models.Match.create(match)
    }

    @PUT
    @Path(':id')
    async updateMatch(@PathParam('id') matchID: number, match: any): Promise<IMatch> {
        const dbMatch = await this.database.models.Match.findById(matchID)

        if (dbMatch) {
        return await dbMatch.update(match)
        } else {
        return await this.database.models.Match.create(match)
        }
    }

    @DELETE
    @Path(':id')
    async deleteMatch(@PathParam('id') matchID: number): Promise<void> {
        const dbMatch = await this.database.models.Match.findById(matchID)

        if (dbMatch) {
        await dbMatch.destroy()
        }
    }

}