import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import BetEvaluator from '../services/betEvaluator'
import Evaluator from '../models/evaluator.model'
import { IMatch } from '../types/models.d'
import evaluators from '../bets/evaluators'

@Path('/api/leagues/:leagueId/evaluators')
export default class EvaluatorsController {
  @Inject
  private database: Database

  @PathParam('leagueId')
  leagueId: string

  @GET
  async getAll(): Promise<IMatch[]> {
    return await this.database.models.Evaluator.findAll({ where: {leagueId: this.leagueId} })
  }

  @GET
  @Path('/types')
  async getTypes(): Promise<any> {
    const types = []
    for (const evaluator in evaluators) {
      types.push(new evaluators[evaluator]().type)
    }

    return types
  }

  @GET
  @Path(':id')
  async get(@PathParam('id') id: number): Promise<IMatch> {
    try {
      const evaluator = await this.database.models.Evaluator.findById(id)

      if (!evaluator) {
        throw new Error('not found')
      }

      return evaluator
    } catch (e) {
      throw new Errors.NotFoundError('Evaluator not found.')
    }
  }

  @POST
  async create(evaluator: any): Promise<IMatch> {
    evaluator.leagueId = this.leagueId

    return await this.database.models.Evaluator.create(evaluator)
  }

  @PUT
  @Path(':id')
  async update(@PathParam('id') id: number, evaluator: any): Promise<any> {
    const dbEvaluator = await this.database.models.Evaluator.findById(id)

    if (dbEvaluator) {
      return await dbEvaluator.update(evaluator)
    } else {
      return await this.database.models.Evaluator.create(evaluator)
    }
  }

  @DELETE
  @Path(':id')
  async delete(@PathParam('id') id: number): Promise<void> {
    const dbEvaluator = await this.database.models.Evaluator.findById(id)

    if (dbEvaluator) {
      await dbEvaluator.destroy()
    }
  }

}
