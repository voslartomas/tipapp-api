import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import SpecialBet from '../models/specialBet.model'
import { ISpecialBet } from '../types/models.d'

@Path('/api/special-bets')
export default class SpecialBetsController {
  @Inject
  private database: Database

  @GET
  async getSpecialBets(): Promise<ISpecialBet[]> {
    return await this.database.models.SpecialBet.findAll({})
  }

  @GET
  @Path(':id')
  async getSpecialBet(@PathParam('id') specialBetId: number): Promise<ISpecialBet> {
    try {
      const user = await this.database.models.SpecialBet.findById(specialBetId)

      if (!user) {
        throw new Error('not found')
      }

      return user
    } catch (e) {
      throw new Errors.NotFoundError('Special bet not found.')
    }
  }

  @POST
  async createSpecialBet(specialBet: any): Promise<ISpecialBet> {
    return await this.database.models.SpecialBet.create(specialBet)
  }

  @PUT
  @Path(':id')
  async updateSpecialBet(@PathParam('id') specialBetId: number, specialBet: any): Promise<ISpecialBet> {
    const dbSpecialBet = await this.database.models.SpecialBet.findById(specialBetId)

    if (dbSpecialBet) {
      return await dbSpecialBet.update(specialBet)
    } else {
      return await this.database.models.SpecialBet.create(specialBet)
    }
  }

  @DELETE
  @Path(':id')
  async deleteSpecialBet(@PathParam('id') specialBetId: number): Promise<void> {
    const dbSpecialBet = await this.database.models.SpecialBet.findById(specialBetId)

    if (dbSpecialBet) {
      await dbSpecialBet.destroy()
    }
  }

}
