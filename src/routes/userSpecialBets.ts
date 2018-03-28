import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import UserSpecialBet from '../models/userSpecialBet.model'
import { IUserSpecialBet } from '../types/models.d'

@Path('/api/user-special-bets')
export default class UserSpecialBetsController {

  @Inject
  private database: Database

  @GET
  async getUserSpecialBets(): Promise<IUserSpecialBet[]> {
    return await this.database.models.UserSpecialBet.findAll({})
  }

  @GET
  @Path(':id')
  async getUserSpecialBet(@PathParam('id') userSpecialBetId: number): Promise<IUserSpecialBet> {
    try {
      const userSpecialBet = await this.database.models.UserSpecialBet.findById(userSpecialBetId)

      if (!userSpecialBet) {
        throw new Error('not found')
      }

      return userSpecialBet
    } catch (e) {
      throw new Errors.NotFoundError('User special bet not found.')
    }
  }

  @POST
  async createUserSpecialBet(userSpecialBet: any): Promise<IUserSpecialBet> {
    return await this.database.models.UserSpecialBet.create(userSpecialBet)
  }

  @PUT
  @Path(':id')
  async updateUserSpecialBet(@PathParam('id') userSpecialBetId: number, userSpecialBet: any): Promise<IUserSpecialBet> {
    const dbUserSpecialBet = await this.database.models.UserSpecialBet.findById(userSpecialBetId)

    if (dbUserSpecialBet) {
      return await dbUserSpecialBet.update(userSpecialBet)
    } else {
      return await this.database.models.UserSpecialBet.create(userSpecialBet)
    }
  }

  @DELETE
  @Path(':id')
  async deleteUserSpecialBet(@PathParam('id') userSpecialBetId: number): Promise<void> {
    const dbUserSpecialBet = await this.database.models.UserSpecialBet.findById(userSpecialBetId)

    if (dbUserSpecialBet) {
      await dbUserSpecialBet.destroy()
    }
  }

}
