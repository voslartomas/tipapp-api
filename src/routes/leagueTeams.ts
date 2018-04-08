import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import LeagueTeam from '../models/leagueTeam.model'
import { ILeagueTeam } from '../types/models.d'

@Path('/api/league-teams')
export default class LeagueTeamController {

    @Inject
    private database: Database

    @GET
    async getLeagueTeams(): Promise<ILeagueTeam[]> {
        return await this.database.models.LeagueTeam.findAll({})
    }

    @GET
    @Path(':id')
    async getLeagueTeam(@PathParam('id') leagueTeamId: number): Promise<ILeagueTeam> {
        try {
            const leagueTeam = await this.database.models.LeagueTeam.findById(leagueTeamId)

            if (!leagueTeam) {
                throw new Error('not found')
            }

            return leagueTeam
        } catch (e) {
            throw new Errors.NotFoundError('User special bet serie not found.')
        }
    }

    @POST
    async createLeagueTeam(leagueTeam: any): Promise<ILeagueTeam> {
        return await this.database.models.LeagueTeam.create(leagueTeam)
    }

    @PUT
    @Path(':id')
    async updateLeagueTeam(@PathParam('id') leagueTeamId: number, leagueTeam: any): Promise<ILeagueTeam> {
        const dbLeagueTeam = await this.database.models.LeagueTeam.findById(leagueTeamId)

        if (dbLeagueTeam) {
            return await dbLeagueTeam.update(leagueTeam)
        } else {
            return await this.database.models.LeagueTeam.create(leagueTeam)
        }
    }

    @DELETE
    @Path(':id')
    async deleteLeagueTeam(@PathParam('id') leagueTeamId: number): Promise<void> {
        const dbLeagueTeam = await this.database.models.LeagueTeam.findById(leagueTeamId)

        if (dbLeagueTeam) {
            await dbLeagueTeam.destroy()
        }
    }

}
