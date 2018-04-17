import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import BetEvaluator from '../services/betEvaluator'
import Match from '../models/match.model'
import { IMatch } from '../types/models.d'

@Path('/api/matches')
export default class MatchesController {
  @Inject
  private database: Database

  @Inject
  private betEvaluator: BetEvaluator

  @GET
  async getMatches(): Promise<IMatch[]> {
    return await this.database.models.Match.findAll({})
  }

  @GET
  @Path(':id')
  async getMatch(@PathParam('id') matchId: number): Promise<IMatch> {
    try {
      const match = await this.database.models.Match.findById(matchId)

      if (!match) {
        throw new Error('not found')
      }

      return match
    } catch (e) {
      throw new Errors.NotFoundError('Match not found.')
    }
  }

  @POST
  async createMatch(match: any): Promise<IMatch> {
    return await this.database.models.Match.create(match)
  }

  @PUT
  @Path(':id')
  async updateMatch(@PathParam('id') matchId: number, match: any): Promise<IMatch> {
    const dbMatch = await this.database.models.Match.findById(matchId)

    if (dbMatch) {
      await this.betEvaluator.updateMatchBets(match)
      return await dbMatch.update(match)
    } else {
      return await this.database.models.Match.create(match)
    }
  }

  @DELETE
  @Path(':id')
  async deleteMatch(@PathParam('id') matchId: number): Promise<void> {
    const dbMatch = await this.database.models.Match.findById(matchId)

    if (dbMatch) {
      await dbMatch.destroy()
    }
  }

}
