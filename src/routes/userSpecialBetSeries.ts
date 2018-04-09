import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import UserSpecialBetSerie from '../models/userSpecialBetSerie.model'
import { IUserSpecialBetSerie } from '../types/models.d'

@Path('/api/user-special-bet-series')
export default class UserSpecialBetSeriesController {

  @Inject
  private database: Database

  @GET
  async getUserSpecialBetSeries(): Promise<IUserSpecialBetSerie[]> {
    return await this.database.models.UserSpecialBetSerie.findAll({})
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
  async updateUserSpecialBetSerie(@PathParam('id') userSpecialBetSerieId: number, userSpecialBetSerie: any): Promise<IUserSpecialBetSerie> {
    const dbUserSpecialBetSerie = await this.database.models.UserSpecialBetSerie.findById(userSpecialBetSerieId)

    if (dbUserSpecialBetSerie) {
      return await dbUserSpecialBetSerie.update(userSpecialBetSerie)
    } else {
      return await this.database.models.UserSpecialBetSerie.create(userSpecialBetSerie)
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
