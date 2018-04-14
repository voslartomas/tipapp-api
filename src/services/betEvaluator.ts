import { IMatch } from '../types/models.d'
import { Inject } from 'typescript-ioc'
import Database from './database'
import { ILeagueSpecialBetSerie, ILeagueSpecialBetSingle } from '../types/models'

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

  async updateSerieBet(betSerie: ILeagueSpecialBetSerie) {
    const userBets = await this.database.models.UserSpecialBetSerie.findAll({where: {leagueSpecialBetSerieId: betSerie.id}})

    userBets.forEach(userBet => {
      userBet.correctBet = false
      userBet.exactBet = false
      userBet.totalPoints = 0

      if (userBet.homeTeamScore === betSerie.homeTeamScore && userBet.awayTeamScore === betSerie.awayTeamScore) {
        userBet.exactBet = true
        userBet.totalPoints += userBet.pointsExact
      }

      if ((userBet.homeTeamScore - userBet.awayTeamScore > 0 && betSerie.homeTeamScore - betSerie.awayTeamScore > 0) ||
      (userBet.homeScore - userBet.awayScore < 0 && betSerie.homeTeamScore - betSerie.awayTeamScore < 0)) {
        userBet.correctBet = true
        userBet.totalPoints += userBet.points
      }

      userBet.save()
    })
  }

  async updateSingleBet(betSingle: ILeagueSpecialBetSingle) {
    const userBets = await this.database.models.UserSPecialBetSingle.findAll({where : {leagueSpecialBetSingleId: betSingle.id}})

    userBets.forEach(userBet => {
      userBet.correctBet = false
      userBet.totalPoints = 0

      if (betSingle.specialBetTeamResultId === userBet.teamResultId ||
      betSingle.specialBetPlayerResultId === userBet.playerResultId ||
      betSingle.specialBetValue === userBet.value) {
        userBet.correcBet = true
        userBet.totalPoints += userBet.points
      }

      userBet.save()
    })
  }
}
