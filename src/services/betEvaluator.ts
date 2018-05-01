import Match from '../models/match.model'
import Evaluator from '../models/evaluator.model'
import LeagueSpecialBetSerie from '../models/leagueSpecialBetSerie.model'
import LeagueSpecialBetSingle from '../models/leagueSpecialBetSingle.model'
import { Inject } from 'typescript-ioc'
import Database from './database'
import { ILeagueSpecialBetSerie, ILeagueSpecialBetSingle } from '../types/models'
import evaluators from '../bets/evaluators'
import IEvaluator from '../bets/evaluators/IEvaluator'

export default class BetEvaluator {
  @Inject
  private database: Database

  getEvaluatorByType(type: string): IEvaluator {
    for (const evaluator in evaluators) {
      const ev = new evaluators[evaluator]()
      if (ev.type === type) {
        return ev
      }
    }
  }

  async updateMatchBets(match: Match) {
    const userBets = await this.database.models.UserBet.findAll({where: {matchId: match.id}})
    const matchScorers = await this.database.models.MatchScorer.findAll({where: {matchId: match.id}})
    const evaluators: Evaluator[] = await this.database.models.Evaluator.findAll({where: {leagueId: match.leagueId, entity: 'matches'}})

    userBets.forEach(userBet => {
      userBet.totalPoints = 0

      evaluators.forEach(e => {
        const evaluator = this.getEvaluatorByType(e.type)

        let result: boolean = false
        if (e.type === 'scorer') {
          result = evaluator.evaluateScorer(matchScorers, userBet)
        } else {
          result = evaluator.evaluateMatch(match, userBet)
        }

        if (result) {
          userBet.totalPoints += parseInt(e.points)
        }
      })

      userBet.save()
    })
  }

  async updateSerieBet(betSerie: LeagueSpecialBetSerie) {
    const userBets = await this.database.models.UserSpecialBetSerie.findAll({where: {leagueSpecialBetSerieId: betSerie.id}})
    const evaluators: Evaluator[] = await this.database.models.Evaluator.findAll({where: {leagueId: betSerie.leagueId, entity: 'series'}})

    userBets.forEach(userBet => {
      userBet.totalPoints = 0

      evaluators.forEach(e => {
        const evaluator = this.getEvaluatorByType(e.type)

        const result = evaluator.evaluateSerie(betSerie, userBet)

        if (result) {
          userBet.totalPoints += parseInt(e.points)
        }
      })

      userBet.save()
    })
  }

  async updateSingleBet(betSingle: LeagueSpecialBetSingle) {
    const userBets = await this.database.models.UserSpecialBetSingle.findAll({where : {leagueSpecialBetSingleId: betSingle.id}})

    userBets.forEach(userBet => {
      userBet.totalPoints = 0

      if (betSingle.specialBetTeamResultId === userBet.teamResultId ||
      betSingle.specialBetPlayerResultId === userBet.playerResultId ||
      betSingle.specialBetValue === userBet.value) {
        userBet.totalPoints += betSingle.points
      }

      userBet.save()
    })
  }
}
