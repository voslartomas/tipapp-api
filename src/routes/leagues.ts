import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import League from '../models/league.model'
import { ILeague } from '../types/models.d'
import { IMatch, IPlayer, ITeam, ILeagueTeam } from '../types/models'
import Match from '../models/match.model'
import Player from '../models/player.model'
import LeagueTeam from '../models/leagueTeam.model'

@Path('/api/leagues')
export default class LeaguesController {
  @Inject
  private database: Database

  @GET
  async getLeagues(): Promise<ILeague[]> {
    return await this.database.models.League.findAll({})
  }

  @GET
  @Path('/:leagueId/matches')
  async getLeagueMatches(@PathParam('leagueId') leagueId: number): Promise<IMatch[]> {
    return await this.database.models.Match.findAll({include: [
        {model: this.database.models.LeagueTeam, as: 'homeTeam', include: [this.database.models.Team]},
        {model: this.database.models.LeagueTeam, as: 'awayTeam', include: [this.database.models.Team]}],
        where: {leagueId: leagueId}})
  }

  @GET
  @Path('/:leagueId/players')
  async getLeaguePlayers(@PathParam('leagueId') leagueId: number): Promise<IPlayer[]> {
    return await this.database.models.LeaguePlayer.findAll({
      include: [
        this.database.models.Player,
        {model: this.database.models.LeagueTeam, include: [this.database.models.Team], where: {leagueId}}
      ], })
  }

  @GET
  @Path('/:leagueId/:leagueTeamId/players')
  async getLeagueTeamPlayers(@PathParam('leagueTeamId') leagueTeamId: number, @PathParam('leagueId') leagueId: number): Promise<IPlayer[]> {
    // TODO: return players from team
    return
  }

  @GET
  @Path(':id')
  async getLeague(@PathParam('id') leagueId: number): Promise<ILeague> {
    try {
      const league = await this.database.models.League.findById(leagueId)

      if (!league) {
        throw new Error('not found')
      }

      return league
    } catch (e) {
      throw new Errors.NotFoundError('League not found.')
    }
  }

  @POST
  async createLeague(league: any): Promise<ILeague> {
    return await this.database.models.League.create(league)
  }

  @PUT
  @Path(':id')
  async updateLeague(@PathParam('id') leagueId: number, league: any): Promise<ILeague> {
    const dbLeague = await this.database.models.League.findById(leagueId)

    if (dbLeague) {
      return await dbLeague.update(league)
    } else {
      return await this.database.models.League.create(league)
    }
  }

  @DELETE
  @Path(':id')
  async deleteBetLeague(@PathParam('id') leagueId: number): Promise<void> {
    const dbLeague = await this.database.models.League.findById(leagueId)

    if (dbLeague) {
      await dbLeague.destroy()
    }
  }

  // Teams
  @GET
  @Path('/:leagueId/teams')
  async getTeams(@PathParam('leagueId') leagueId: number): Promise<ITeam[]> {
    const leagueTeams = await this.database.models.LeagueTeam.findAll({
      include: [this.database.models.Team, {model: this.database.models.League, include: [this.database.models.Sport]}],
      where: { leagueId }
    })

    return leagueTeams
  }

  @POST
  @Path('/:id/teams')
  async createTeam(@PathParam('id') leagueId: number, leagueTeam: any): Promise<ILeagueTeam> {
      return await this.database.models.LeagueTeam.create(leagueTeam)
  }

  @DELETE
  @Path('/:leagueId/teams/:id')
  async deleteTeam(@PathParam('id') teamId: number): Promise<void> {
      const dbLeagueTeam = await this.database.models.LeagueTeam.findById(teamId)

      if (dbLeagueTeam) {
          await dbLeagueTeam.destroy()
      }
  }

}
