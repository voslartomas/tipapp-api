import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import League from '../models/league.model'
import { ILeague } from '../types/models.d'
import { IMatch, IPlayer, ITeam } from '../types/models'
import Match from '../models/match.model'
import Player from '../models/player.model'
import Team from '../models/team.model'

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
    return await this.database.models.Match.findAll({
        // TODO: include teams info
        where: {leagueId: leagueId}})
  }

  @GET
  @Path('/:leagueId/teams')
  async getTeams(@PathParam('leagueId') leagueId: number): Promise<ITeam[]> {
    const leagueTeams = await this.database.models.LeagueTeam.findAll({ where: { leagueId } })
    const teams = []
    for (const leagueTeam in leagueTeams) {
      const team = await this.database.models.Team.findById(leagueTeam)
        teams.push(team)
      }

      return teams
  }

  @GET
  @Path('/:leagueId/players')
  async getLeaguePlayers(@PathParam('leagueId') leagueId: number): Promise<IPlayer[]> {
    // TODO: return players from league
    return
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

}
