import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import UserBet from '../models/userBet.model'
import { IUserBet } from '../types/models.d'

@Path('/api/user-bets')
export default class UserBetsController {

  @Inject
  private database: Database

  @GET
  async getUserBets(): Promise<IUserBet[]> {
    return await this.database.models.UserBet.findAll({})
  }

  @GET
  @Path(':id')
  async getUserBet(@PathParam('id') userBetId: number): Promise<IUserBet> {
    try {
      const userBet = await this.database.models.UserBet.findById(userBetId)

      if (!userBet) {
        throw new Error('not found')
      }

      return userBet
    } catch (e) {
      throw new Errors.NotFoundError('User bet not found.')
    }
  }

  @POST
  async createUserBet(usetBet: any): Promise<IUserBet> {
    return await this.database.models.UserBet.create(usetBet)
  }

  @PUT
  @Path(':id')
  async updateUserBet(@PathParam('id') userBetId: number, userBet: any): Promise<IUserBet> {
    const dbUserBet = await this.database.models.UserBet.findById(userBetId)

    if (dbUserBet) {
      return await dbUserBet.update(userBet)
    } else {
      return await this.database.models.UserBet.create(userBet)
    }
  }

  @DELETE
  @Path(':id')
  async deleteUserBet(@PathParam('id') userBetId: number): Promise<void> {
    const dbUserBet = await this.database.models.UserBet.findById(userBetId)

    if (dbUserBet) {
      await dbUserBet.destroy()
    }
  }

}
