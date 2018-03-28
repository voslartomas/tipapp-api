import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import MatchScorer from '../models/matchScorer.model'
import { IMatchScorer } from '../types/models.d'

@Path('/api/matchScorers')
export default class MatchScoresController {
    @Inject
    private database: Database

    @GET
    async getMatchScorers(): Promise<IMatchScorer[]> {
        return await this.database.models.MatchScorer.findAll({})
    }

    @GET
    @Path(':id')
    async getMatchScorer(@PathParam('id') matchScorerId: number): Promise<IMatchScorer> {
        try {
        const matchScorer = await this.database.models.MatchScorer.findById(matchScorerId, {})

        if (!matchScorer) {
            throw new Error('not found')
        }

        return matchScorer
        } catch (e) {
        throw new Errors.NotFoundError('User not found.')
        }
    }

    @POST
    async createMatchScorer(matchScorer: any): Promise<IMatchScorer> {
        return await this.database.models.MatchScorer.create(matchScorer)
    }

    @PUT
    @Path(':id')
    async updateMatchScorer(@PathParam('id') matchScorerId: number, matchScorer: any): Promise<IMatchScorer> {
        const dbMatchScorer = await this.database.models.MatchScorer.findById(matchScorerId)

        if (dbMatchScorer) {
        return await dbMatchScorer.update(matchScorer)
        } else {
        return await this.database.models.MatchScorer.create(matchScorer)
        }
    }

    @DELETE
    @Path(':id')
    async deleteMatchScorer(@PathParam('id') matchScorerId: number): Promise<void> {
        const dbMatchScorer = await this.database.models.MatchScorer.findById(matchScorerId)

        if (dbMatchScorer) {
        await dbMatchScorer.destroy()
        }
    }

}