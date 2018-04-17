import { Path, GET, POST, PUT, DELETE, PathParam, Errors, Context, ServiceContext } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import UserBet from '../models/userBet.model'
import { IUserBet } from '../types/models.d'

@Path('/api/leagues/:leagueId/user/bets/match')
export default class UserBetsController {
  @Context
  context: ServiceContext

  @Inject
  private database: Database

  @PathParam('leagueId')
  leagueId: number

  @GET
  async getUserBets(): Promise<IUserBet[]> {
    const leagueUser = await this.database.models.LeagueUser.findOne({where: { userId: this.context.request['user'].id, leagueId: this.leagueId }})
    if (!leagueUser) {
      throw new Error('User not signed into league.')
    }

    return await this.database.models.UserBet.findAll({ where: {leagueUserId: leagueUser.id} })
  }

  @PUT
  @Path(':id')
  async updateUserBet(@PathParam('id') userBetId: number = 0, userBet: any): Promise<IUserBet> {
    const leagueUser = await this.database.models.LeagueUser.findOne({where: { userId: this.context.request['user'].id, leagueId: this.leagueId }})

    if (leagueUser && leagueUser.id === userBet.leagueUserId) {
      throw new Error('User not signed into this league.')
    }

    const dbUserBet = await this.database.models.UserBet.findOne({where: {matchId: userBet.matchId, leagueUserId: leagueUser.id}})
    if (dbUserBet) {
        return await dbUserBet.update(userBet)
    } else {
      userBet.leagueUserId = leagueUser.id
      userBet.dateTime = new Date()
      return await this.database.models.UserBet.create(userBet)
    }
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

  @DELETE
  @Path(':id')
  async deleteUserBet(@PathParam('id') userBetId: number): Promise<void> {
    const dbUserBet = await this.database.models.UserBet.findById(userBetId)

    if (dbUserBet) {
      await dbUserBet.destroy()
    }
  }

}
