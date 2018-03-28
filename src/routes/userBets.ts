import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import UserBet from '../models/userBet.model'
import { IUserBet } from '../types/models.d'

@Path('/api/userBets')
export default class UserBetsController {

    @Inject
    private database: Database

    @GET
    async getUserBets(): Promise<IUserBet[]> {
      return await this.database.models.UserBet.findAll({})
    }

    @GET
    @Path(':id')
    async getUserBet(@PathParam('id') userBetID: number): Promise<IUserBet> {
        try {
        const userBet = await this.database.models.UserBet.findById(userBetID)

        if (!userBet) {
            throw new Error('not found')
        }

        return userBet
        } catch (e) {
        throw new Errors.NotFoundError('User not found.')
        }
    }

    @POST
    // TODO fix user: IUser, error while running tests
    async createUserBet(usetBet: any): Promise<IUserBet> {
        return await this.database.models.UserBet.create(usetBet)
    }

    @PUT
    @Path(':id')
    async updateUserBet(@PathParam('id') userBetID: number, usetBet: any): Promise<IUserBet> {
        const dbUserBet = await this.database.models.UserBet.findById(userBetID)

        if (dbUserBet) {
        return await dbUserBet.update(usetBet)
        } else {
        return await this.database.models.UserBet.create(usetBet)
        }
    }

    @DELETE
    @Path(':id')
    async deleteUserBet(@PathParam('id') userBetID: number): Promise<void> {
        const dbUserBet = await this.database.models.UserBet.findById(userBetID)

        if (dbUserBet) {
        await dbUserBet.destroy()
        }
    }

}