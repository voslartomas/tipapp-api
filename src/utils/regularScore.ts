import Match from '../models/match.model'
import UserBet from '../models/userBet.model'

export const getRegularScore = (result: Match, tip: UserBet) => {

    const data = {
      'homeScoreRegularTime': result.homeScore,
      'awayScoreRegularTime': result.awayScore,
      'homeTipScoreRegularTime': tip.homeScore,
      'awayTipScoreRegularTime': tip.awayScore
    }

    if (result.overtime) {
      if (result.homeScore > result.awayScore) {
        data.homeScoreRegularTime = data.homeScoreRegularTime - 1
      } else {
        data.awayScoreRegularTime = data.awayScoreRegularTime - 1
      }
    }

    if (tip.overtime) {
      if (tip.homeScore > tip.awayScore) {
        data.homeTipScoreRegularTime = data.homeTipScoreRegularTime - 1
      } else {
        data.awayTipScoreRegularTime = data.awayTipScoreRegularTime - 1
      }
    }

    return data
}