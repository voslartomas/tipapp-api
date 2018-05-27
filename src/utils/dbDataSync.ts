const path = '../models/fixtures/'
const bCrypt = require('bcrypt-nodejs')
const leaguePlayers = require(path + 'leaguePlayersDefaultData').LeaguePlayers
const leagues = require(path + 'leaguesDefaultData').Leagues
const leagueSpecialBetSingles = require(path + 'leagueSpecialBetSinglesDefaultData').LeagueSpecialBetSingles
const leagueSpecialBetSeries = require(path + 'leagueSpecialBetSeriesDefaultData').LeagueSpecialBetSeries
const leagueTeams = require(path + 'leagueTeamsDefaultData').LeagueTeams
const leagueUsers = require(path + 'leagueUsersDefaultData').LeagueUsers
const matches = require(path + 'matchesDefaultData').Matches
const matchScorers = require(path + 'matchScorersDefaultData').MatchScorers
const players = require(path + 'playersDefaultData').Players
const specialBetSeries = require(path + 'specialBetSeriesDefaultData').SpecialBetSeries
const specialBetSingles = require(path + 'specialBetSinglesDefaultData').SpecialBetSingles
const sports = require(path + 'sportsDefaultData').Sports
const teams = require(path + 'teamsDefaultData').Teams
const users = require(path + 'usersDefaultData').Users
const userBets = require(path + 'userBetsDefaultData').UserBets
const userRequests = require(path + 'userRequestsDefaultData').UserRequests
const userSettings = require(path + 'userSettingsDefaultData').UserSettings
const userSpecialBetSeries = require(path + 'userSpecialBetSeriesDefaultData').UserSpecialBetSeries
const userSpecialBetSingles = require(path + 'userSpecialBetSinglesDefaultData').UserSpecialBetSingles

export default async (models) => {
  let e = false

  for (const a of sports) {
        await models.Sport.findOrCreate({
            where: { name: a.name },
            defaults: a
        }).error(err => e = err)
  }

  for (const a of teams) {
        await models.Team.findOrCreate({
            where: { name: a.name,
                nickname: a.nickname,
                shortcut: a.shortcut,
                sportId: a.sport
            },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of leagues) {
        await models.League.findOrCreate({
            where: { name: a.name,
                sportId: a.sport,
                seasonTo: a.seasonTo,
                seasonFrom: a.seasonFrom
            },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of players) {
        await models.Player.findOrCreate({
            where: { firstName: a.firstName,
                lastName: a.lastName,
                isActive: a.isActive
            },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of leagueTeams) {
      await models.LeagueTeam.findOrCreate({
          where: { leagueId: a.leagueId,
              teamId: a.teamId
          },
          defaults: a
      }).error(err => e = err)
  }

  for (const a of leaguePlayers) {
        await models.LeaguePlayer.findOrCreate({
            where: { leagueTeamId: a.leagueTeamId,
                playerId: a.playerId
            },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of matches) {
        await models.Match.findOrCreate({
            where: { leagueId: a.leagueId,
                homeTeamId: a.homeTeamId,
                awayTeamId: a.awayTeamId,
                dateTime: a.dateTime
            },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of matchScorers) {
        await models.MatchScorer.findOrCreate({
            where: {
                matchId: a.matchId,
                scorerId: a.scorerId
            },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of users) {
        a.salt = bCrypt.genSaltSync(8)
        a.password = await bCrypt.hashSync(a.password, a.salt, undefined)
        await models.User.findOrCreate({
            where: { username: a.username },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of leagueUsers) {
        await models.LeagueUser.findOrCreate({
            where: { leagueId: a.leagueId,
                userId: a.userId
            },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of userRequests) {
        await models.UserRequest.findOrCreate({
            where: {
                userId: a.userId,
                leagueId: a.bettingLeagueId
            },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of userSettings) {
        await models.UserSetting.findOrCreate({
            where: {
                leagueUserId: a.leagueUserId
            },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of specialBetSeries) {
        await models.SpecialBetSerie.findOrCreate({
            where: { bestOf: a.bestOf,
                name: a.name
            },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of specialBetSingles) {
        await models.SpecialBetSingle.findOrCreate({
            where: { sportId: a.sportId,
                specialBetType: a.specialBetType,
                name: a.name
            },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of leagueSpecialBetSeries) {
        await models.LeagueSpecialBetSerie.findOrCreate({
            where: { leagueId: a.leagueId,
                specialBetSerieId: a.specialBetSerieId,
                homeTeamId: a.homeTeamId,
                awayTeamId: a.awayTeamId
            },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of leagueSpecialBetSingles) {
        await models.LeagueSpecialBetSingle.findOrCreate({
            where: { leagueId: a.leagueId,
                specialBetSingleId: a.specialBetSingleId,
                dateTime: a.dateTime
            },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of userBets) {
        await models.UserBet.findOrCreate({
            where: { matchId: a.matchId,
                leagueUserId: a.leagueUserId
            },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of userSpecialBetSeries) {
      console.log(a.leagueSpecialBetSerieId)

        await models.UserSpecialBetSerie.findOrCreate({
            where: {
                leagueSpecialBetSerieId: a.leagueSpecialBetSerieId,
                leagueUserId: a.leagueUserId
            },
            defaults: a
        }).error(err => e = err)
    }

  for (const a of userSpecialBetSingles) {
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
