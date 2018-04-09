import { Path, GET, POST, PUT, DELETE, PathParam, Errors, Context, ServiceContext } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import UserSpecialBetSerie from '../models/userSpecialBetSerie.model'
import { IUserSpecialBetSerie } from '../types/models.d'

@Path('/api/leagues/:leagueId/user/bets/series')
export default class UserSpecialBetSeriesController {
  @Context
  context: ServiceContext

  @Inject
  private database: Database

  @PathParam('leagueId')
  leagueId: number

  @GET
  async getUserSpecialBetSeries(): Promise<IUserSpecialBetSerie[]> {
    const leagueUser = await this.database.models.LeagueUser.findOne({where: { userId: this.context.request['user'].id, leagueId: this.leagueId }})
    if (!leagueUser) {
      throw new Error('User not signed into league.')
    }

    return await this.database.models.UserSpecialBetSerie.findAll({ where: {leagueUserId: leagueUser.id} })
  }

  @GET
  @Path(':id')
  async getUserSpecialBetSerie(@PathParam('id') userSpecialBetSerieId: number): Promise<IUserSpecialBetSerie> {
    try {
      const userSpecialBetSerie = await this.database.models.UserSpecialBetSerie.findById(userSpecialBetSerieId)

      if (!userSpecialBetSerie) {
        throw new Error('not found')
      }

      return userSpecialBetSerie
    } catch (e) {
      throw new Errors.NotFoundError('User special bet serie not found.')
    }
  }

  @POST
  async createUserSpecialBetSerie(userSpecialBetSerie: any): Promise<IUserSpecialBetSerie> {
    return await this.database.models.UserSpecialBetSerie.create(userSpecialBetSerie)
  }

  @PUT
  @Path(':id')
  async updateUserSpecialBetSerie(@PathParam('id') userSpecialBetSerieId: number = 0, userSpecialBetSerie: any): Promise<IUserSpecialBetSerie> {
    const dbUserSpecialBetSerie = await this.database.models.UserSpecialBetSerie.findById(userSpecialBetSerieId)

    if (dbUserSpecialBetSerie) {
      // check if userId match
      const leagueUser = await this.database.models.LeagueUser.findOne({where: { userId: this.context.request['user'].id, leagueId: this.leagueId }})
      if (leagueUser && leagueUser.id === dbUserSpecialBetSerie.leagueUserId) {
        return await dbUserSpecialBetSerie.update(userSpecialBetSerie)
      }

      throw new Error('User not signed into this league.')
    } else {
      const leagueUser = await this.database.models.LeagueUser.findOne({where: { userId: this.context.request['user'].id, leagueId: this.leagueId }})

      if (leagueUser) {
          userSpecialBetSerie.leagueUserId = leagueUser.id
          userSpecialBetSerie.dateTime = new Date()
          return await this.database.models.UserSpecialBetSerie.create(userSpecialBetSerie)
      }

      throw new Error('User not signed into this league.')
    }
  }

  @DELETE
  @Path(':id')
  async deleteUserSpecialBetSerie(@PathParam('id') userSpecialBetSerieId: number): Promise<void> {
    const dbUserSpecialBetSerie = await this.database.models.UserSpecialBetSerie.findById(userSpecialBetSerieId)

    if (dbUserSpecialBetSerie) {
      await dbUserSpecialBetSerie.destroy()
    }
  }

}
