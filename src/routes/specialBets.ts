import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import SpecialBet from '../models/specialBet.model'
import { ISpecialBet } from '../types/models.d'

@Path('/api/specBets')
export default class SpecialBetsController {

    @Inject
    private database: Database

    @GET
    async getSpecialBets(): Promise<ISpecialBet[]> {
      return await this.database.models.SpecialBet.findAll({})
    }

    @GET
    @Path(':id')
    async getSpecialBet(@PathParam('id') specialBetID: number): Promise<ISpecialBet> {
        try {
        const user = await this.database.models.SpecialBet.findById(specialBetID)

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
    async createSpecialBet(specialBet: any): Promise<ISpecialBet> {
        return await this.database.models.SpecialBet.create(specialBet)
    }

    @PUT
    @Path(':id')
    async updateSpecialBet(@PathParam('id') specialBetID: number, specialBet: any): Promise<ISpecialBet> {
        const dbSpecialBet = await this.database.models.SpecialBet.findById(specialBetID)

        if (dbSpecialBet) {
        return await dbSpecialBet.update(specialBet)
        } else {
        return await this.database.models.SpecialBet.create(specialBet)
        }
    }

    @DELETE
    @Path(':id')
    async deleteSpecialBet(@PathParam('id') specialBetID: number): Promise<void> {
        const dbSpecialBet = await this.database.models.SpecialBet.findById(specialBetID)

        if (dbSpecialBet) {
        await dbSpecialBet.destroy()
        }
    }

}