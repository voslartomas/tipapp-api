import IEvaluator from './IEvaluator'
import UserBet from '../../models/userBet.model'
import MatchScorer from '../../models/matchScorer.model'
import BestScorer from './bestScorer'

export default class SecondBestScorer implements IEvaluator {
  type = 'scorer'

  evaluateScorer(matchScorers: MatchScorer[], tip: UserBet): boolean {
    if (new BestScorer().evaluateScorer(matchScorers, tip)) {
      return false
    }

    for (const scorer of matchScorers) {
      if (tip.scorerId === scorer.scorerId && scorer.scorer.secondBestScorer) {
        return true
      }
    }

    return false
  }
}
