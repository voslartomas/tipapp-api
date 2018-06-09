import IEvaluator from './IEvaluator'
import Match from '../../models/match.model'
import LeagueSpecialBetSerie from '../../models/leagueSpecialBetSerie.model'
import UserBet from '../../models/userBet.model'
import UserSpecialBetSerie from '../../models/userSpecialBetSerie.model'
import Exact from './exact'
import Draw from './draw'

export default class ScoreOneTeam implements IEvaluator {
  type = 'scoreOneTeam'

  evaluateMatch(result: Match, tip: UserBet): boolean {
    if (new Exact().evaluateMatch(result, tip)) {
      return false
    }

    if (new Draw().evaluateMatch(result, tip)) {
      return false
    }

    return ((tip.homeScore === result.homeScore || tip.awayScore === result.awayScore) && !result.overtime) ||
    (result.overtime && result.homeScore < tip.awayScore && tip.homeScore === result.homeScore) ||
    (result.overtime && result.awayScore < tip.homeScore && tip.awayScore === result.awayScore)
  }

  evaluateSerie(result: LeagueSpecialBetSerie, tip: UserSpecialBetSerie): boolean {
    return tip.homeTeamScore === result.homeTeamScore || tip.awayTeamScore === result.awayTeamScore
  }
}
