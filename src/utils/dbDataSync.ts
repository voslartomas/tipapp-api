const data = require('../models/fixtures/dbDefaultData')
const bCrypt = require('bcrypt-nodejs')

export default async (models) => {
  let e = false

  for (const a of data.Sports) {
    await models.Sport.findOrCreate({
      where: { czName: a.czName,
              value: a.value
      },
      defaults: a
    }).error(err => e = err)
  }

  for (const a of data.Teams) {
    await models.Team.findOrCreate({
      where: { czName: a.czName,
        value: a.value,
        league: a.league
      },
      defaults: a
    }).error(err => e = err)
  }

  for (const a of data.Players) {
    await models.Player.findOrCreate({
      where: { firstName: a.firstName,
        lastName: a.lastName,
        team: a.team,
        seasonTo: a.seasonTo,
        seasonFrom: a.seasonFrom
      },
      defaults: a
    }).error(err => e = err)
  }

  for (const a of data.BettingLeagues) {
    await models.League.findOrCreate({
      where: { name: a.name,
        sportId: a.sport,
        seasonTo: a.seasonTo,
        seasonFrom: a.seasonFrom
      },
      defaults: a
    }).error(err => e = err)
  }

  for (const a of data.Matches) {
    await models.Match.findOrCreate({
      where: { gameNumber: a.gameNumber },
      defaults: a
    }).error(err => e = err)
  }

  for (const a of data.Users) {
    a.password = await bCrypt.hashSync(a.password, bCrypt.genSaltSync(8), undefined)
    await models.User.findOrCreate({
      where: { username: a.username },
      defaults: a
    }).error(err => e = err)
  }

  for (const a of data.SpecialBets) {
    await models.SpecialBet.findOrCreate({
      where: { key: a.key },
      defaults: a
    }).error(err => e = err)
  }

  for (const a of data.UserPayments) {
    await models.UserPayment.findOrCreate({
      where: {
        userId: a.userId,
        bettingLeagueId: a.bettingLeagueId
      },
      defaults: a
    }).error(err => e = err)
  }

  for (const a of data.UserRequests) {
    await models.UserRequest.findOrCreate({
      where: {
        userId: a.userId,
        bettingLeagueId: a.bettingLeagueId
      },
      defaults: a
    }).error(err => e = err)
  }

  for (const a of data.UserSettings) {
    await models.UserSetting.findOrCreate({
      where: {
        userId: a.userId,
        bettingLeagueId: a.bettingLeagueId
      },
      defaults: a
    }).error(err => e = err)
  }

  for (const a of data.MatchScorers) {
    await models.MatchScorer.findOrCreate({
      where: {
        matchId: a.matchId,
        scorerId: a.scorerId
      },
      defaults: a
    }).error(err => e = err)
  }

  for (const a of data.UserBets) {
    await models.UserBet.findOrCreate({
      where: {
        matchId: a.matchId,
        userId: a.userId
      },
      defaults: a
    }).error(err => e = err)
  }

  for (const a of data.UserSpecialBets) {
    await models.UserSpecialBet.findOrCreate({
      where: {
        bettingLeagueId: a.bettingLeagueId,
        specialBetId: a.specialBetId,
        userId: a.userId,
        // if(a.specialBetId === 3) {
        seriesHomeTeam: a.seriesHomeTeam,
        seriesAwayTeam: a.seriesAwayTeam
        // }
      },
      defaults: a
    }).error(err => e = err)
  }

  for (const a of data.SpecialBetsResults) {
    await models.SpecialBetResult.findOrCreate({
      where: {
        bettingLeagueId: a.bettingLeagueId,
        specialBetId: a.specialBetId,
        // if(a.specialBetId === 3) {
        seriesHomeTeam: a.seriesHomeTeam,
        seriesAwayTeam: a.seriesAwayTeam
        // }

      },
      defaults: a
    }).error(err => e = err)
  }

  return e

}
