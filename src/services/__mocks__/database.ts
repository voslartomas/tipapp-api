import Shared from './fixtures/shared'

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
    UserBet: Shared,
    LeagueUser: Shared,
    UserRequest: Shared,
    UserSetting: Shared,
    UserSpecialBet: Shared,
    MatchScorer: Shared,
  }

  constructor() {

  }

  sync() {
    return new Promise((resolve, reject) => {
      resolve('done')
    })
  }
}
