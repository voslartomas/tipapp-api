import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import SpecialBetSingle from '../models/specialBetSingle.model'
import { ISpecialBetSingle } from '../types/models.d'

@Path('/api/bets/single')
export default class SpecialBetSinglesController {

    @Inject
    private database: Database

    @GET
    async getSpecialBetSingles(): Promise<ISpecialBetSingle[]> {
        return await this.database.models.SpecialBetSingle.findAll({})
    }

    @GET
    @Path(':id')
    async getSpecialBetSingle(@PathParam('id') SpecialBetSingleId: number): Promise<ISpecialBetSingle> {
        try {
            const specialBetSingle = await this.database.models.SpecialBetSingle.findById(SpecialBetSingleId)

            if (!specialBetSingle) {
                throw new Error('not found')
            }

            return specialBetSingle
        } catch (e) {
            throw new Errors.NotFoundError(' special bet Single not found.')
        }
    }

    @POST
    async createSpecialBetSingle(SpecialBetSingle: any): Promise<ISpecialBetSingle> {
        return await this.database.models.SpecialBetSingle.create(SpecialBetSingle)
    }

    @PUT
    @Path(':id')
    async updateSpecialBetSingle(@PathParam('id') SpecialBetSingleId: number, SpecialBetSingle: any): Promise<ISpecialBetSingle> {
        const dbSpecialBetSingle = await this.database.models.SpecialBetSingle.findById(SpecialBetSingleId)

        if (dbSpecialBetSingle) {
            return await dbSpecialBetSingle.update(SpecialBetSingle)
        } else {
            return await this.database.models.SpecialBetSingle.create(SpecialBetSingle)
        }
    }

    @DELETE
    @Path(':id')
    async deleteSpecialBetSingle(@PathParam('id') SpecialBetSingleId: number): Promise<void> {
        const dbSpecialBetSingle = await this.database.models.SpecialBetSingle.findById(SpecialBetSingleId)

        if (dbSpecialBetSingle) {
            await dbSpecialBetSingle.destroy()
        }
    }

}
