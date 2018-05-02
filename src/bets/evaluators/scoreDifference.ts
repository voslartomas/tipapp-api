import IEvaluator from './IEvaluator'
import Match from '../../models/match.model'
import LeagueSpecialBetSerie from '../../models/leagueSpecialBetSerie.model'
import UserBet from '../../models/userBet.model'
import UserSpecialBetSerie from '../../models/userSpecialBetSerie.model'
import Exact from './exact'

export default class ScoreDifference implements IEvaluator {
  type = 'scoreDifference'

  evaluateMatch(result: Match, tip: UserBet): boolean {

    if (new Exact().evaluateMatch(result, tip)) {
      return false
    }

    return Math.abs(tip.homeScore - tip.awayScore) === Math.abs(result.homeScore - result.awayScore)
  }

  evaluateSerie(result: LeagueSpecialBetSerie, tip: UserSpecialBetSerie): boolean {
    return Math.abs(tip.homeTeamScore - tip.awayTeamScore) === Math.abs(result.homeTeamScore - result.awayTeamScore)
  }
}
