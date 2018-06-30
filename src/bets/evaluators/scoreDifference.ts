import IEvaluator from './IEvaluator'
import Match from '../../models/match.model'
import LeagueSpecialBetSerie from '../../models/leagueSpecialBetSerie.model'
import UserBet from '../../models/userBet.model'
import UserSpecialBetSerie from '../../models/userSpecialBetSerie.model'
import Exact from './exact'
import Draw from './draw'
import Winner from './winner'
import { getRegularScore } from '../../utils/regularScore'

export default class ScoreDifference implements IEvaluator {
  type = 'scoreDifference'

  evaluateMatch(result: Match, tip: UserBet): boolean {
    if (new Exact().evaluateMatch(result, tip)) {
      return false
    }

    if (new Draw().evaluateMatch(result, tip)) {
      return false
    }

    // on football there are score difference points only with winner
    if (new Winner().evaluateMatch(result, tip)) {
      const data = getRegularScore(result, tip)

      const homeScoreRegularTime = data.homeScoreRegularTime
      const awayScoreRegularTime = data.awayScoreRegularTime
      const homeTipScoreRegularTime = data.homeTipScoreRegularTime
      const awayTipScoreRegularTime = data.awayTipScoreRegularTime

      return homeTipScoreRegularTime - awayTipScoreRegularTime === homeScoreRegularTime - awayScoreRegularTime
    }

  }

  evaluateSerie(result: LeagueSpecialBetSerie, tip: UserSpecialBetSerie): boolean {
    return tip.homeTeamScore - tip.awayTeamScore === result.homeTeamScore - result.awayTeamScore
  }
}
