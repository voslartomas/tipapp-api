import Draw from './draw'
import Exact from './exact'
import IEvaluator from './IEvaluator'
import LeagueSpecialBetSerie from '../../models/leagueSpecialBetSerie.model'
import Match from '../../models/match.model'
import UserBet from '../../models/userBet.model'
import UserSpecialBetSerie from '../../models/userSpecialBetSerie.model'
import { getRegularScore } from '../../utils/regularScore'

export default class Winner implements IEvaluator {
  type = 'winner'

  evaluateMatch(result: Match, tip: UserBet): boolean {

    if (new Exact().evaluateMatch(result, tip)) {
      return false
    }

    // if (new Draw().evaluateMatch(result, tip)) {
    //   return false
    // }

    // const data = getRegularScore(result, tip)

    const homeScoreRegularTime = result.homeScore
    const awayScoreRegularTime = result.awayScore
    const homeTipScoreRegularTime = tip.homeScore
    const awayTipScoreRegularTime = tip.awayScore

    return ((homeTipScoreRegularTime - awayTipScoreRegularTime > 0 && homeScoreRegularTime - awayScoreRegularTime > 0) ||
    (homeTipScoreRegularTime - awayTipScoreRegularTime < 0 && homeScoreRegularTime - awayScoreRegularTime < 0))
  }

  evaluateSerie(result: LeagueSpecialBetSerie, tip: UserSpecialBetSerie): boolean {
    return ((tip.homeTeamScore - tip.awayTeamScore > 0 && result.homeTeamScore - result.awayTeamScore > 0) ||
    (tip.homeTeamScore - tip.awayTeamScore < 0 && result.homeTeamScore - result.awayTeamScore < 0))
  }
}
