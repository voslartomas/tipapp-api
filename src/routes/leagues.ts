import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import League from '../models/league.model'
import { ILeague } from '../types/models.d'
import { IMatch, IPlayer } from '../types/models'
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
  async getMatches(@PathParam('leagueId') leagueId: number): Promise<IMatch[]> {
    return await this.database.models.Match.findAll({where: {leagueId: leagueId}})
  }

  @GET
  @Path('/:leagueId/players')
  async getPlayers(@PathParam('leagueId') leagueId: number): Promise<IPlayer[]> {
    const teams = await this.database.models.Team.findAll({where: { leagueId}})
    let players = []
    for (const team in teams) {
      const teamPlayers = await this.database.models.Player.findAll({where: { teamId: team.id}})
      players = players.concat(teamPlayers)
    }
    return await this.database.models.Player.findAll({where: {teamId: leagueId}})
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
