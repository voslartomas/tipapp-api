import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import Sport from '../models/sport.model'
import { ISport, ILeague } from '../types/models.d'

@Path('/api/sports')
export default class SportsController {

  @Inject
  private database: Database

  @GET
  async getSports(): Promise<ISport[]> {
    return await this.database.models.Sport.findAll({})
  }

  @GET
  @Path('/:sportId/leagues')
  async getLeagues(@PathParam('sportId') sportId: number): Promise<ILeague[]> {
    return await this.database.models.League.findAll({where: {sportId: sportId}})
  }

  @GET
  @Path(':id')
  async getSport(@PathParam('id') sportId: number): Promise<ISport> {
    try {
      const sport = await this.database.models.Sport.findById(sportId)

      if (!sport) {
        throw new Error('not found')
      }

      return sport
    } catch (e) {
      throw new Errors.NotFoundError('Sport not found.')
    }
  }

  @POST
  async createSport(sport: any): Promise<ISport> {
    return await this.database.models.Sport.create(sport)
  }

  @PUT
  @Path(':id')
  async updateSport(@PathParam('id') sportId: number, sport: any): Promise<ISport> {
    const dbSport = await this.database.models.Sport.findById(sportId)

    if (dbSport) {
      return await dbSport.update(sport)
    } else {
      return await this.database.models.Sport.create(sport)
    }
  }

  @DELETE
  @Path(':id')
  async deleteSport(@PathParam('id') sportId: number): Promise<void> {
    const dbSport = await this.database.models.Sport.findById(sportId)

    if (dbSport) {
      await dbSport.destroy()
    }
  }

}
