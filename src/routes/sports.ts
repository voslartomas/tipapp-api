import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import Sport from '../models/sport.model'
import { ISport } from '../types/models.d'

@Path('/api/sports')
export default class SportsController {

    @Inject
    private database: Database

    @GET
    async getSports(): Promise<ISport[]> {
      return await this.database.models.Sport.findAll({})
    }

    @GET
    @Path(':id')
    async getSport(@PathParam('id') sportID: number): Promise<ISport> {
        try {
        const user = await this.database.models.Sport.findById(sportID)

        if (!user) {
            throw new Error('not found')
        }

        return user
        } catch (e) {
        throw new Errors.NotFoundError('User not found.')
        }
    }

    @POST
    async createSport(sport: any): Promise<ISport> {
        return await this.database.models.Sport.create(sport)
    }

    @PUT
    @Path(':id')
    async updateSport(@PathParam('id') sportID: number, sport: any): Promise<ISport> {
        const dbSport = await this.database.models.Sport.findById(sportID)

        if (dbSport) {
        return await dbSport.update(sport)
        } else {
        return await this.database.models.Sport.create(sport)
        }
    }

    @DELETE
    @Path(':id')
    async deleteSport(@PathParam('id') sportID: number): Promise<void> {
        const dbSport = await this.database.models.Sport.findById(sportID)

        if (dbSport) {
        await dbSport.destroy()
        }
    }

}