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

    const homeScoreRegularTime = result.homeScore
    const awayScoreRegularTime = result.awayScore
    const homeTipScoreRegularTime = tip.homeScore
    const awayTipScoreRegularTime = tip.awayScore

    /* DEBUG */
    if (tip.id === 1622) {
      console.log('result: ' + JSON.stringify(result))
      console.log('tip: ' + JSON.stringify(tip))
      console.log('data: ' + JSON.stringify(data))
      console.log(`1: ${homeScoreRegularTime === homeTipScoreRegularTime}`)
      console.log(`2: ${awayScoreRegularTime === awayTipScoreRegularTime}`)
      console.log(`3: ${result.overtime === tip.overtime}`)
    }

    return homeScoreRegularTime === homeTipScoreRegularTime && awayScoreRegularTime === awayTipScoreRegularTime &&
      result.overtime === tip.overtime
  }

  evaluateSerie(result: LeagueSpecialBetSerie, tip: UserSpecialBetSerie): boolean {
    return result.homeTeamScore === tip.homeTeamScore && result.awayTeamScore === tip.awayTeamScore
  }
}
