import IEvaluator from './IEvaluator'
import Match from '../../models/match.model'
import LeagueSpecialBetSerie from '../../models/leagueSpecialBetSerie.model'
import UserBet from '../../models/userBet.model'
import UserSpecialBetSerie from '../../models/userSpecialBetSerie.model'
import Exact from './exact'
import Draw from './draw'
import { getRegularScore } from '../../utils/regularScore'

export default class ScoreOneTeam implements IEvaluator {
  type = 'scoreOneTeam'

  evaluateMatch(result: Match, tip: UserBet): boolean {
    if (new Exact().evaluateMatch(result, tip)) {
      return false
    }

    if (new Draw().evaluateMatch(result, tip)) {
      return false
    }

    const data = getRegularScore(result, tip)

    const homeScoreRegularTime = data.homeScoreRegularTime
    const awayScoreRegularTime = data.awayScoreRegularTime
    const homeTipScoreRegularTime = data.homeTipScoreRegularTime
    const awayTipScoreRegularTime = data.awayTipScoreRegularTime

    return (homeTipScoreRegularTime === homeScoreRegularTime || awayTipScoreRegularTime === awayScoreRegularTime) ||
    (homeScoreRegularTime < awayTipScoreRegularTime && homeTipScoreRegularTime === homeScoreRegularTime) ||
    (awayScoreRegularTime < homeTipScoreRegularTime && awayTipScoreRegularTime === awayScoreRegularTime)
  }

  evaluateSerie(result: LeagueSpecialBetSerie, tip: UserSpecialBetSerie): boolean {
    return tip.homeTeamScore === result.homeTeamScore || tip.awayTeamScore === result.awayTeamScore
  }
}
