import Shared from './fixtures/shared'
import betMatches from './fixtures/betMatches'

export default class Database {
  public models = {
    User: Shared,
    League: Shared,
    Match: Shared,
    Player: Shared,
    Sport: Shared,
    Team: Shared,
    SpecialBetSerie: Shared,
    SpecialBetSingle: Shared,
    UserBet: betMatches,
    LeagueUser: Shared,
    LeaguePlayer: Shared,
    LeagueTeam: Shared,
    UserRequest: Shared,
    UserSetting: Shared,
    UserSpecialBet: Shared,
    MatchScorer: Shared,
    Evaluator: Shared
  }

  constructor() {

  }

  sync() {
    return new Promise((resolve, reject) => {
      resolve('done')
    })
  }
}
