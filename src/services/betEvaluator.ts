import { ILeagueSpecialBetSerie, ILeagueSpecialBetSingle } from '../types/models'

import Database from './database'
import Evaluator from '../models/evaluator.model'
import IEvaluator from '../bets/evaluators/IEvaluator'
import { Inject } from 'typescript-ioc'
import LeagueSpecialBetSerie from '../models/leagueSpecialBetSerie.model'
import LeagueSpecialBetSingle from '../models/leagueSpecialBetSingle.model'
import Match from '../models/match.model'
import evaluators from '../bets/evaluators'

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
    const matchScorers = await this.database.models.MatchScorer.findAll({
      include: [this.database.models.LeaguePlayer],
      where: {matchId: match.id}})
    const evaluators: Evaluator[] = await this.database.models.Evaluator.findAll({where: {leagueId: match.leagueId, entity: 'matches'}})

    for (const i in userBets) {
      const userBet = userBets[i]
      userBet.totalPoints = 0

      for (const x in evaluators) {
        const e = evaluators[x]
        const evaluator = this.getEvaluatorByType(e.type)

        if (!evaluator) return undefined

        let result: boolean = false
        const scorers = [ 'bestScorer', 'secondBestScorer', 'thirdBestScorer', 'fourthBestScorer',  'scorer', ]
        if (scorers.includes(e.type)) {
          result = evaluator.evaluateScorer(matchScorers, userBet)
        } else {
          result = evaluator.evaluateMatch(match, userBet)
        }

        if (result) {
          userBet.totalPoints += parseInt(e.points) * (match.isDoubled ? 2 : 1)
        }
      }

      await userBet.save()
    }
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

      if ((userBet.teamResultId && betSingle.specialBetTeamResultId === userBet.teamResultId) ||
      (userBet.playerResultId && betSingle.specialBetPlayerResultId === userBet.playerResultId) ||
      (userBet.value && betSingle.specialBetValue == userBet.value)) {
        userBet.totalPoints += betSingle.points
      }

      userBet.save()
    })
  }
}
