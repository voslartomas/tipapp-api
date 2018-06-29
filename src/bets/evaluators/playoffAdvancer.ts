import IEvaluator from './IEvaluator'
import Match from '../../models/match.model'
import LeagueSpecialBetSerie from '../../models/leagueSpecialBetSerie.model'
import UserBet from '../../models/userBet.model'
import UserSpecialBetSerie from '../../models/userSpecialBetSerie.model'
import MatchScorer from '../../models/matchScorer.model'

export default class PlayoffAdvancer implements IEvaluator {
    type = 'playoffAdvancer'

    evaluateMatch(result: Match, tip: UserBet): boolean {
        if (result.isPlayoffGame) {
          return ((tip.homeScore - tip.awayScore > 0 && result.homeScore - result.awayScore > 0) ||
          (tip.homeScore - tip.awayScore < 0 && result.homeScore - result.awayScore < 0))
        } else {
          return false
        }
  }
}
