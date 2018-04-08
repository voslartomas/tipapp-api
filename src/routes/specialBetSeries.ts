import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import SpecialBetSerie from '../models/SpecialBetSerie.model'
import { ISpecialBetSerie } from '../types/models.d'

@Path('/api/-special-bet-series')
export default class SpecialBetSeriesController {

    @Inject
    private database: Database

    @GET
    async getSpecialBetSeries(): Promise<ISpecialBetSerie[]> {
        return await this.database.models.SpecialBetSerie.findAll({})
    }

    @GET
    @Path(':id')
    async getSpecialBetSerie(@PathParam('id') SpecialBetSerieId: number): Promise<ISpecialBetSerie> {
        try {
            const specialBetSerie = await this.database.models.SpecialBetSerie.findById(SpecialBetSerieId)

            if (!specialBetSerie) {
                throw new Error('not found')
            }

            return specialBetSerie
        } catch (e) {
            throw new Errors.NotFoundError(' special bet serie not found.')
        }
    }

    @POST
    async createSpecialBetSerie(SpecialBetSerie: any): Promise<ISpecialBetSerie> {
        return await this.database.models.SpecialBetSerie.create(SpecialBetSerie)
    }

    @PUT
    @Path(':id')
    async updateSpecialBetSerie(@PathParam('id') SpecialBetSerieId: number, SpecialBetSerie: any): Promise<ISpecialBetSerie> {
        const dbSpecialBetSerie = await this.database.models.SpecialBetSerie.findById(SpecialBetSerieId)

        if (dbSpecialBetSerie) {
            return await dbSpecialBetSerie.update(SpecialBetSerie)
        } else {
            return await this.database.models.SpecialBetSerie.create(SpecialBetSerie)
        }
    }

    @DELETE
    @Path(':id')
    async deleteSpecialBetSerie(@PathParam('id') SpecialBetSerieId: number): Promise<void> {
        const dbSpecialBetSerie = await this.database.models.SpecialBetSerie.findById(SpecialBetSerieId)

        if (dbSpecialBetSerie) {
            await dbSpecialBetSerie.destroy()
        }
    }

}
