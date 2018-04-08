import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import LeaguePlayer from '../models/leaguePlayer.model'
import { ILeaguePlayer } from '../types/models.d'

@Path('/api/league-players')
export default class LeaguePlayerController {

    @Inject
    private database: Database

    @GET
    async getLeaguePlayers(): Promise<ILeaguePlayer[]> {
        return await this.database.models.LeaguePlayer.findAll({})
    }

    @GET
    @Path(':id')
    async getLeaguePlayer(@PathParam('id') leaguePlayerId: number): Promise<ILeaguePlayer> {
        try {
            const leaguePlayer = await this.database.models.LeaguePlayer.findById(leaguePlayerId)

            if (!leaguePlayer) {
                throw new Error('not found')
            }

            return leaguePlayer
        } catch (e) {
            throw new Errors.NotFoundError('User special bet serie not found.')
        }
    }

    @POST
    async createLeaguePlayer(leaguePlayer: any): Promise<ILeaguePlayer> {
        return await this.database.models.LeaguePlayer.create(leaguePlayer)
    }

    @PUT
    @Path(':id')
    async updateLeaguePlayer(@PathParam('id') leaguePlayerId: number, leaguePlayer: any): Promise<ILeaguePlayer> {
        const dbLeaguePlayer = await this.database.models.LeaguePlayer.findById(leaguePlayerId)

        if (dbLeaguePlayer) {
            return await dbLeaguePlayer.update(leaguePlayer)
        } else {
            return await this.database.models.LeaguePlayer.create(leaguePlayer)
        }
    }

    @DELETE
    @Path(':id')
    async deleteLeaguePlayer(@PathParam('id') leaguePlayerId: number): Promise<void> {
        const dbLeaguePlayer = await this.database.models.LeaguePlayer.findById(leaguePlayerId)

        if (dbLeaguePlayer) {
            await dbLeaguePlayer.destroy()
        }
    }

}
