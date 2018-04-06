import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import SpecialBetResult from '../models/specialBetSerie.model'
import { ISpecialBetSerie } from '../types/models.d'

@Path('/api/special-bet-results')
export default class SpecialBetResultsController {

  @Inject
  private database: Database

  @GET
  async getSpecialBetResults(): Promise<ISpecialBetSerie[]> {
    return await this.database.models.SpecialBetResult.findAll({})
  }

  @GET
  @Path(':id')
  async getSpecialBetResult(@PathParam('id') specialBetResultId: number): Promise<ISpecialBetSerie> {
    try {
      const specialBetResult = await this.database.models.SpecialBetResult.findById(specialBetResultId)

      if (!specialBetResult) {
        throw new Error('not found')
      }

      return specialBetResult
    } catch (e) {
      throw new Errors.NotFoundError('Special bet result not found.')
    }
  }

  @POST
  async createSpecialBet(specialBetResult: any): Promise<ISpecialBetSerie> {
    return await this.database.models.SpecialBetResult.create(specialBetResult)
  }

  @PUT
  @Path(':id')
  async updateSpecialBet(@PathParam('id') specialBetResultId: number, specialBetResult: any): Promise<ISpecialBetSerie> {
    const dbSpecialBetResult = await this.database.models.SpecialBetResult.findById(specialBetResultId)

    if (dbSpecialBetResult) {
      return await dbSpecialBetResult.update(specialBetResult)
    } else {
      return await this.database.models.SpecialBetResult.create(specialBetResult)
    }
  }

  @DELETE
  @Path(':id')
  async deleteSpecialBet(@PathParam('id') specialBetResultId: number): Promise<void> {
    const dbSpecialBetResult = await this.database.models.SpecialBetResult.findById(specialBetResultId)

    if (dbSpecialBetResult) {
      await dbSpecialBetResult.destroy()
    }
  }

}
