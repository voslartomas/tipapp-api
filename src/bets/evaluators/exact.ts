import IEvaluator from './IEvaluator'
import LeagueSpecialBetSerie from '../../models/leagueSpecialBetSerie.model'
import Match from '../../models/match.model'
import UserBet from '../../models/userBet.model'
import UserSpecialBetSerie from '../../models/userSpecialBetSerie.model'
import { getRegularScore } from '../../utils/regularScore'

export default class Exact implements IEvaluator {
  type = 'exact'

  evaluateMatch(result: Match, tip: UserBet): boolean {
    const data = getRegularScore(result, tip)
    const strangeRules = result.leagueId === 7

    const homeScoreRegularTime = strangeRules ? data.homeScoreRegularTime : result.homeScore
    const awayScoreRegularTime = strangeRules ? data.awayScoreRegularTime : result.awayScore
    const homeTipScoreRegularTime = strangeRules ? data.homeTipScoreRegularTime : tip.homeScore
    const awayTipScoreRegularTime = strangeRules ? data.awayTipScoreRegularTime : tip.awayScore

    const normalCounting = homeScoreRegularTime === homeTipScoreRegularTime && awayScoreRegularTime === awayTipScoreRegularTime

    return strangeRules ? normalCounting && (result.overtime === tip.overtime) : normalCounting
  }

  evaluateSerie(result: LeagueSpecialBetSerie, tip: UserSpecialBetSerie): boolean {
    return result.homeTeamScore === tip.homeTeamScore && result.awayTeamScore === tip.awayTeamScore
  }
}
