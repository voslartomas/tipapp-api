import IEvaluator from './IEvaluator'
import Match from '../../models/match.model'
import LeagueSpecialBetSerie from '../../models/leagueSpecialBetSerie.model'
import UserBet from '../../models/userBet.model'
import UserSpecialBetSerie from '../../models/userSpecialBetSerie.model'
import Exact from './exact'

export default class Winner implements IEvaluator {
  type = 'winner'

  evaluateMatch(result: Match, tip: UserBet): boolean {

    if (new Exact().evaluateMatch(result, tip)) {
      return false
    }

    return ((tip.homeScore - tip.awayScore > 0 && result.homeScore - result.awayScore > 0) ||
    (tip.homeScore - tip.awayScore < 0 && result.homeScore - result.awayScore < 0))
  }

  evaluateSerie(result: LeagueSpecialBetSerie, tip: UserSpecialBetSerie): boolean {
    return ((tip.homeTeamScore - tip.awayTeamScore > 0 && result.homeTeamScore - result.awayTeamScore > 0) ||
    (tip.homeTeamScore - tip.awayTeamScore < 0 && result.homeTeamScore - result.awayTeamScore < 0))
  }
}
