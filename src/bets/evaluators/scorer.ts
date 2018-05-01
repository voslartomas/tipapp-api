import IEvaluator from './IEvaluator'
import Match from '../../models/match.model'
import LeagueSpecialBetSerie from '../../models/leagueSpecialBetSerie.model'
import UserBet from '../../models/userBet.model'
import UserSpecialBetSerie from '../../models/userSpecialBetSerie.model'
import MatchScorer from '../../models/matchScorer.model'

export default class Scorer implements IEvaluator {
  type = 'scorer'

  evaluateScorer(matchScorers: MatchScorer[], tip: UserBet): boolean {
    for (const scorer of matchScorers) {
      if (tip.scorerId === scorer.scorerId) {
        return true
      }
    }

    return false
  }
}
