import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import UserSpecialBet from '../models/userSpecialBet.model'
import { IUserSpecialBet } from '../types/models.d'

@Path('/api/userSpecBets')
export default class UserSpecialBetsController {

    @Inject
    private database: Database

    @GET
    async getUserSpecialBets(): Promise<IUserSpecialBet[]> {
      return await this.database.models.UserSpecialBet.findAll({})
    }

    @GET
    @Path(':id')
    async getUserSpecialBet(@PathParam('id') userSpecialBetID: number): Promise<IUserSpecialBet> {
        try {
        const user = await this.database.models.UserSpecialBet.findById(userSpecialBetID)

        if (!user) {
            throw new Error('not found')
        }

        return user
        } catch (e) {
        throw new Errors.NotFoundError('User not found.')
        }
    }

    @POST
    async createUserSpecialBet(userSpecialBet: any): Promise<IUserSpecialBet> {
        return await this.database.models.UserSpecialBet.create(userSpecialBet)
    }

    @PUT
    @Path(':id')
    async updateUserSpecialBet(@PathParam('id') userSpecialBetID: number, userSpecialBet: any): Promise<IUserSpecialBet> {
        const dbUserSpecialBet = await this.database.models.UserSpecialBet.findById(userSpecialBetID)

        if (dbUserSpecialBet) {
        return await dbUserSpecialBet.update(userSpecialBet)
        } else {
        return await this.database.models.UserSpecialBet.create(userSpecialBet)
        }
    }

    @DELETE
    @Path(':id')
    async deleteUserSpecialBet(@PathParam('id') userSpecialBetID: number): Promise<void> {
        const dbUserSpecialBet = await this.database.models.UserSpecialBet.findById(userSpecialBetID)

        if (dbUserSpecialBet) {
        await dbUserSpecialBet.destroy()
        }
    }

}