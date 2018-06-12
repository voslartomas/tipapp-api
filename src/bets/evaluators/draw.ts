import IEvaluator from './IEvaluator'
import Match from '../../models/match.model'
import LeagueSpecialBetSerie from '../../models/leagueSpecialBetSerie.model'
import UserBet from '../../models/userBet.model'
import UserSpecialBetSerie from '../../models/userSpecialBetSerie.model'
import MatchScorer from '../../models/matchScorer.model'
import Exact from './exact'

export default class Draw implements IEvaluator {
    type = 'draw'

    evaluateMatch(result: Match, tip: UserBet): boolean {
        if (new Exact().evaluateMatch(result, tip)) {
            return false
        }

        return tip.homeScore - tip.awayScore === 0 && result.homeScore - result.awayScore === 0
            && tip.overtime === result.overtime
    }

}