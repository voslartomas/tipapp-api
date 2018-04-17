import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import LeagueSpecialBetSingle from '../models/leagueSpecialBetSingle.model'
import { ILeagueSpecialBetSingle } from '../types/models.d'
import BetEvaluator from '../services/betEvaluator'

@Path('/api/leagues/:leagueId/bets/single')
export default class LeagueSpecialBetSingleController {
    @Inject
    private database: Database

    @PathParam('leagueId')
    leagueId: string

    @Inject
    private betEvaluator: BetEvaluator

    @GET
    async getLeagueSpecialBetSingles(): Promise<ILeagueSpecialBetSingle[]> {
        return await this.database.models.LeagueSpecialBetSingle.findAll({
          include: [
            {model: this.database.models.LeagueTeam, as: 'specialBetTeamResult', include: [this.database.models.Team]},
            {model: this.database.models.LeaguePlayer, as: 'specialBetPlayerResult', include: [this.database.models.Player]},
            this.database.models.SpecialBetSingle
          ],
          where: {leagueId: this.leagueId}
        })
    }

    @GET
    @Path(':id')
    async getLeagueSpecialBetSingle(@PathParam('id') leagueSpecialBetSingleId: number): Promise<ILeagueSpecialBetSingle> {
        try {
            const leagueSpecialBetSingle = await this.database.models.LeagueSpecialBetSingle.findById(leagueSpecialBetSingleId)

            if (!leagueSpecialBetSingle) {
                throw new Error('not found')
            }

            return leagueSpecialBetSingle
        } catch (e) {
            throw new Errors.NotFoundError('User special bet serie not found.')
        }
    }

    @POST
    async createLeagueSpecialBetSingle(leagueSpecialBetSingle: any): Promise<ILeagueSpecialBetSingle> {
        return await this.database.models.LeagueSpecialBetSingle.create(leagueSpecialBetSingle)
    }

    @PUT
    @Path(':id')
    async updateLeagueSpecialBetSingle(@PathParam('id') leagueSpecialBetSingleId: number, leagueSpecialBetSingle: any): Promise<ILeagueSpecialBetSingle> {
        const dbLeagueSpecialBetSingle = await this.database.models.LeagueSpecialBetSingle.findById(leagueSpecialBetSingleId)

        if (dbLeagueSpecialBetSingle) {
            await this.betEvaluator.updateSingleBet(leagueSpecialBetSingle)
            return await dbLeagueSpecialBetSingle.update(leagueSpecialBetSingle)
        } else {
            return await this.database.models.LeagueSpecialBetSingle.create(leagueSpecialBetSingle)
        }
    }

    @DELETE
    @Path(':id')
    async deleteLeagueSpecialBetSingle(@PathParam('id') leagueSpecialBetSingleId: number): Promise<void> {
        const dbLeagueSpecialBetSingle = await this.database.models.LeagueSpecialBetSingle.findById(leagueSpecialBetSingleId)

        if (dbLeagueSpecialBetSingle) {
            await dbLeagueSpecialBetSingle.destroy()
        }
    }

}
