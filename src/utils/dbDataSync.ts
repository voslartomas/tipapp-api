const data = require('../models/fixtures/dbDefaultData')
const bCrypt = require('bcrypt-nodejs')

export default async (models) => {
  let e = false

  for (const a of data.Sports) {
        await models.Sport.findOrCreate({
            where: { name: a.name },
            defaults: a
        }).error(err => e = err)
  }

  for (const a of data.Teams) {
        await models.Team.findOrCreate({
            where: { name: a.name,
                nickname: a.nickname,
                shortcut: a.shortcut,
                sportId: a.sport
            },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of data.Leagues) {
        await models.League.findOrCreate({
            where: { name: a.name,
                sportId: a.sport,
                seasonTo: a.seasonTo,
                seasonFrom: a.seasonFrom
            },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of data.Players) {
        await models.Player.findOrCreate({
            where: { firstName: a.firstName,
                lastName: a.lastName,
                isActive: a.isActive
            },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of data.LeagueTeams) {
      await models.LeagueTeam.findOrCreate({
          where: { leagueId: a.leagueId,
              teamId: a.teamId
          },
          defaults: a
      }).error(err => e = err)
  }

  for (const a of data.LeaguePlayers) {
        await models.LeaguePlayer.findOrCreate({
            where: { leagueTeamId: a.leagueTeamId,
                playerId: a.playerId
            },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of data.Matches) {
        await models.Match.findOrCreate({
            where: { leagueId: a.leagueId,
                homeTeamId: a.homeTeamId,
                awayTeamId: a.awayTeamId,
                dateTime: a.dateTime
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

  for (const a of data.Users) {
        a.salt = bCrypt.genSaltSync(8)
        a.password = await bCrypt.hashSync(a.password, a.salt, undefined)
        await models.User.findOrCreate({
            where: { username: a.username },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of data.LeagueUsers) {
        await models.LeagueUser.findOrCreate({
            where: { leagueId: a.leagueId,
                userId: a.userId
            },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of data.UserRequests) {
        await models.UserRequest.findOrCreate({
            where: {
                userId: a.userId,
                leagueId: a.bettingLeagueId
            },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of data.UserSettings) {
        await models.UserSetting.findOrCreate({
            where: {
                leagueUserId: a.leagueUserId
            },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of data.SpecialBetSeries) {
        await models.SpecialBetSerie.findOrCreate({
            where: { bestOf: a.bestOf,
                name: a.name
            },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of data.SpecialBetSingles) {
        await models.SpecialBetSingle.findOrCreate({
            where: { sportId: a.sportId,
                specialBetType: a.specialBetType,
                name: a.name
            },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of data.LeagueSpecialBetSeries) {
        await models.LeagueSpecialBetSerie.findOrCreate({
            where: { leagueId: a.leagueId,
                specialBetSerieId: a.specialBetSerieId,
                homeTeamId: a.homeTeamId,
                awayTeamId: a.awayTeamId
            },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of data.LeagueSpecialBetSingles) {
        await models.LeagueSpecialBetSingle.findOrCreate({
            where: { leagueId: a.leagueId,
                specialBetSingleId: a.specialBetSingleId,
                dateTime: a.dateTime
            },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of data.UserBets) {
        await models.UserBet.findOrCreate({
            where: { matchId: a.matchId,
                leagueUserId: a.leagueUserId
            },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of data.UserSpecialBetSeries) {
      console.log(a.leagueSpecialBetSerieId)

        await models.UserSpecialBetSerie.findOrCreate({
            where: {
                leagueSpecialBetSerieId: a.leagueSpecialBetSerieId,
                leagueUserId: a.leagueUserId
            },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of data.UserSpecialBetSingles) {
        await models.UserSpecialBetSingle.findOrCreate({
            where: {
                 leagueSpecialBetSingleId: a.leagueSpecialBetSingleId,
                leagueUserId: a.leagueUserId
            },
            defaults: a
        }).error(err => e = err)
    }

  return e

}
