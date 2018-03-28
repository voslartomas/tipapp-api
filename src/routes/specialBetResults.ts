import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import SpecialBetResult from '../models/specialBetResult.model'
import { ISpecialBetResult } from '../types/models.d'

@Path('/api/specBetResults')
export default class SpecialBetResultsController {

    @Inject
    private database: Database

    @GET
    async getSpecialBetResults(): Promise<ISpecialBetResult[]> {
      return await this.database.models.SpecialBetResult.findAll({})
    }

    @GET
    @Path(':id')
    async getSpecialBetResult(@PathParam('id') specialBetResultID: number): Promise<ISpecialBetResult> {
        try {
        const user = await this.database.models.SpecialBetResult.findById(specialBetResultID)

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
    async createSpecialBet(specialBetResult: any): Promise<ISpecialBetResult> {
        return await this.database.models.SpecialBetResult.create(specialBetResult)
    }

    @PUT
    @Path(':id')
    async updateSpecialBet(@PathParam('id') specialBetResultID: number, specialBetResult: any): Promise<ISpecialBetResult> {
        const dbSpecialBetResult = await this.database.models.SpecialBetResult.findById(specialBetResultID)

        if (dbSpecialBetResult) {
        return await dbSpecialBetResult.update(specialBetResult)
        } else {
        return await this.database.models.SpecialBetResult.create(specialBetResult)
        }
    }

    @DELETE
    @Path(':id')
    async deleteSpecialBet(@PathParam('id') specialBetResultID: number): Promise<void> {
        const dbSpecialBetResult = await this.database.models.SpecialBetResult.findById(specialBetResultID)

        if (dbSpecialBetResult) {
        await dbSpecialBetResult.destroy()
        }
    }

}