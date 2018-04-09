import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import UserSpecialBetSingle from '../models/userSpecialBetSingle.model'
import { IUserSpecialBetSingle } from '../types/models.d'

@Path('/api/user-special-bet-singles')
export default class UserSpecialBetSinglesController {

    @Inject
    private database: Database

    @GET
    async getUserSpecialBetSingles(): Promise<IUserSpecialBetSingle[]> {
        return await this.database.models.UserSpecialBetSingle.findAll({})
    }

    @GET
    @Path(':id')
    async getUserSpecialBetSingle(@PathParam('id') userSpecialBetSingleId: number): Promise<IUserSpecialBetSingle> {
        try {
            const userSpecialBetSingle = await this.database.models.UserSpecialBetSingle.findById(userSpecialBetSingleId)

            if (!userSpecialBetSingle) {
                throw new Error('not found')
            }

            return userSpecialBetSingle
        } catch (e) {
            throw new Errors.NotFoundError('User special bet Single not found.')
        }
    }

    @POST
    async createUserSpecialBetSingle(userSpecialBetSingle: any): Promise<IUserSpecialBetSingle> {
        return await this.database.models.UserSpecialBetSingle.create(userSpecialBetSingle)
    }

    @PUT
    @Path(':id')
    async updateUserSpecialBetSingle(@PathParam('id') userSpecialBetSingleId: number, userSpecialBetSingle: any): Promise<IUserSpecialBetSingle> {
        const dbUserSpecialBetSingle = await this.database.models.UserSpecialBetSingle.findById(userSpecialBetSingleId)

        if (dbUserSpecialBetSingle) {
            return await dbUserSpecialBetSingle.update(userSpecialBetSingle)
        } else {
            return await this.database.models.UserSpecialBetSingle.create(userSpecialBetSingle)
        }
    }

    @DELETE
    @Path(':id')
    async deleteUserSpecialBetSingle(@PathParam('id') userSpecialBetSingleId: number): Promise<void> {
        const dbUserSpecialBetSingle = await this.database.models.UserSpecialBetSingle.findById(userSpecialBetSingleId)

        if (dbUserSpecialBetSingle) {
            await dbUserSpecialBetSingle.destroy()
        }
    }

}