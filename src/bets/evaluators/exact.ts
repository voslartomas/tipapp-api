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

    const homeScoreRegularTime = strangeRules ? result.homeScore : data.homeScoreRegularTime
    const awayScoreRegularTime = strangeRules ? result.awayScore : data.awayScoreRegularTime
    const homeTipScoreRegularTime = strangeRules ? tip.homeScore : data.homeTipScoreRegularTime
    const awayTipScoreRegularTime = strangeRules ? tip.awayScore : data.awayTipScoreRegularTime

    const normalCounting = homeScoreRegularTime === homeTipScoreRegularTime && awayScoreRegularTime === awayTipScoreRegularTime

    return strangeRules ? normalCounting && (result.overtime === tip.overtime) : normalCounting
  }

  evaluateSerie(result: LeagueSpecialBetSerie, tip: UserSpecialBetSerie): boolean {
    return result.homeTeamScore === tip.homeTeamScore && result.awayTeamScore === tip.awayTeamScore
  }
}