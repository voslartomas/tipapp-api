import IEvaluator from './IEvaluator'
import Match from '../../models/match.model'
import LeagueSpecialBetSerie from '../../models/leagueSpecialBetSerie.model'
import UserBet from '../../models/userBet.model'
import UserSpecialBetSerie from '../../models/userSpecialBetSerie.model'

export default class Exact implements IEvaluator {
  type = 'exact'

  evaluateMatch(result: Match, tip: UserBet): boolean {
    return result.homeScore === tip.homeScore && result.awayScore === tip.awayScore && result.overtime === tip.overtime
  }

  evaluateSerie(result: LeagueSpecialBetSerie, tip: UserSpecialBetSerie): boolean {
    return result.homeTeamScore === tip.homeTeamScore && result.awayTeamScore === tip.awayTeamScore
  }
}
