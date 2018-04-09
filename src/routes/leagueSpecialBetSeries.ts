import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import LeagueSpecialBetSerie from '../models/leagueSpecialBetSerie.model'
import { ILeagueSpecialBetSerie } from '../types/models.d'

@Path('/api/leagues/:leagueId/bets/series')
export default class LeagueSpecialBetSerieController {
    @Inject
    private database: Database

    @PathParam('leagueId')
    leagueId: string

    @GET
    async getLeagueSpecialBetSeries(): Promise<ILeagueSpecialBetSerie[]> {
        return await this.database.models.LeagueSpecialBetSerie.findAll({
          include: [
            {model: this.database.models.LeagueTeam, as: 'homeTeam', include: [this.database.models.Team]},
            {model: this.database.models.LeagueTeam, as: 'awayTeam', include: [this.database.models.Team]},
            this.database.models.SpecialBetSerie
          ],
          where: {leagueId: this.leagueId}
        })
    }

    @GET
    @Path(':id')
    async getLeagueSpecialBetSerie(@PathParam('id') leagueSpecialBetSerieId: number): Promise<ILeagueSpecialBetSerie> {
        try {
            const leagueSpecialBetSerie = await this.database.models.LeagueSpecialBetSerie.findById(leagueSpecialBetSerieId)

            if (!leagueSpecialBetSerie) {
                throw new Error('not found')
            }

            return leagueSpecialBetSerie
        } catch (e) {
            throw new Errors.NotFoundError('User special bet serie not found.')
        }
    }

    @POST
    async createLeagueSpecialBetSerie(leagueSpecialBetSerie: any): Promise<ILeagueSpecialBetSerie> {
        return await this.database.models.LeagueSpecialBetSerie.create(leagueSpecialBetSerie)
    }

    @PUT
    @Path(':id')
    async updateLeagueSpecialBetSerie(@PathParam('id') leagueSpecialBetSerieId: number, leagueSpecialBetSerie: any): Promise<ILeagueSpecialBetSerie> {
        const dbLeagueSpecialBetSerie = await this.database.models.LeagueSpecialBetSerie.findById(leagueSpecialBetSerieId)

        if (dbLeagueSpecialBetSerie) {
            return await dbLeagueSpecialBetSerie.update(leagueSpecialBetSerie)
        } else {
            return await this.database.models.LeagueSpecialBetSerie.create(leagueSpecialBetSerie)
        }
    }

    @DELETE
    @Path(':id')
    async deleteLeagueSpecialBetSerie(@PathParam('id') leagueSpecialBetSerieId: number): Promise<void> {
        const dbLeagueSpecialBetSerie = await this.database.models.LeagueSpecialBetSerie.findById(leagueSpecialBetSerieId)

        if (dbLeagueSpecialBetSerie) {
            await dbLeagueSpecialBetSerie.destroy()
        }
    }

}
