import { Path, GET, POST, PUT, DELETE, PathParam, QueryParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import LeaguePlayer from '../models/leaguePlayer.model'
import { ILeaguePlayer } from '../types/models.d'

@Path('/api/leagues/:leagueId/players')
export default class LeaguePlayerController {
    @Inject
    private database: Database

    @PathParam('leagueId')
    leagueId: string

    @GET
    async getLeaguePlayers(@PathParam('leagueId') leagueId: number, @QueryParam('teams') teams: string): Promise<ILeaguePlayer[]> {
      return await this.database.models.LeaguePlayer.findAll({
        include: [
          this.database.models.Player,
          {model: this.database.models.LeagueTeam, include: [{model: this.database.models.Team}], where: {leagueId, id: teams.split(',')}}
        ], })
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
            throw new Errors.NotFoundError('League player not found.')
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
