import { IMatch } from '../types/models.d'
import { Inject } from 'typescript-ioc'
import Database from './database'

export default class BetEvaluator {
  @Inject
  private database: Database

  async updateMatchBets(match: IMatch) {
    const userBets = await this.database.models.UserBet.findAll({where: {matchId: match.id}})
    const matchScorers = await this.database.models.MatchScorer.findAll({where: {matchId: match.id}})

    userBets.forEach(userBet => {
      userBet.correctBetScorer = false
      userBet.correctBet = false
      userBet.exactBet = false
      userBet.totalPoints = 0

      matchScorers.forEach(scorer => {
        if (userBet.scorerId === scorer.id) {
          userBet.correctBetScorer = true
          userBet.totalPoints += userBet.pointsScorer
        }
      })

      if (userBet.homeScore === match.homeScore && userBet.awayScore === match.awayScore) {
        userBet.exactBet = true
        userBet.totalPoints += userBet.pointsExact
      }

      if ((userBet.homeScore - userBet.awayScore > 0 && match.homeScore - match.awayScore > 0) ||
      (userBet.homeScore - userBet.awayScore < 0 && match.homeScore - match.awayScore < 0)) {
        userBet.correctBet = true
        userBet.totalPoints += userBet.points
      }

      userBet.save()
    })
  }

  async updateSerieBet() {}
  async updateSingleBet() {}
}
