import IEvaluator from './IEvaluator'
import Match from '../../models/match.model'
import LeagueSpecialBetSerie from '../../models/leagueSpecialBetSerie.model'
import UserBet from '../../models/userBet.model'
import UserSpecialBetSerie from '../../models/userSpecialBetSerie.model'
import { getRegularScore } from '../../utils/regularScore'

export default class Exact implements IEvaluator {
  type = 'exact'

  evaluateMatch(result: Match, tip: UserBet): boolean {
    const data = getRegularScore(result, tip)

    const homeScoreRegularTime = data.homeScoreRegularTime
    const awayScoreRegularTime = data.awayScoreRegularTime
    const homeTipScoreRegularTime = data.homeTipScoreRegularTime
    const awayTipScoreRegularTime = data.awayTipScoreRegularTime

    return homeScoreRegularTime === homeTipScoreRegularTime && awayScoreRegularTime === awayTipScoreRegularTime
  }

  evaluateSerie(result: LeagueSpecialBetSerie, tip: UserSpecialBetSerie): boolean {
    return result.homeTeamScore === tip.homeTeamScore && result.awayTeamScore === tip.awayTeamScore
  }
}
