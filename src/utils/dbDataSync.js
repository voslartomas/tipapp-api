'use strict'
const data = require('../config/dbDefaultData')
const bCrypt = require('bcrypt-nodejs')

module.exports = async (models) => {

  let e = false

  for (let a of data.Sports){
    await models.sport.findOrCreate({
      where: { czName: a.czName,
              value: a.value
      },
      defaults: a
    }).error(err => e = err)
  }

  for (let a of data.Teams){
    await models.team.findOrCreate({
      where: { czName: a.czName,
        value: a.value,
        league: a.league
      },
      defaults: a
    }).error(err => e = err)
  }

  for (let a of data.Players){
    await models.player.findOrCreate({
      where: { firstName: a.firstName,
        lastName: a.lastName,
        team: a.team,
        seasonTo: a.seasonTo,
        seasonFrom: a.seasonFrom
      },
      defaults: a
    }).error(err => e = err)
  }

  for (let a of data.Matches){
    await models.match.findOrCreate({
      where: { gameNumber: a.gameNumber },
      defaults: a
    }).error(err => e = err)
  }

  for (let a of data.Users){
    a.password = await bCrypt.hashSync(a.password, bCrypt.genSaltSync(8), null)
    await models.user.findOrCreate({
      where: { username: a.username },
      defaults: a
    }).error(err => e = err)
  }

  for (let a of data.BettingLeagues){
    await models.bettingLeague.findOrCreate({
      where: { name: a.name,
        sport: a.sport,
        seasonTo: a.seasonTo,
        seasonFrom: a.seasonFrom
      },
      defaults: a
    }).error(err => e = err)
  }

  for (let a of data.SpecialBets){
    await models.specialBet.findOrCreate({
      where: { key: a.key },
      defaults: a
    }).error(err => e = err)
  }

  for (let a of data.UserPayments){
    await models.userPayment.findOrCreate({
      where: { 
        userId: a.userId,
        bettingLeagueId: a.bettingLeagueId  
      },
      defaults: a
    }).error(err => e = err)
  }

  for (let a of data.UserRequests){
    await models.userRequest.findOrCreate({
      where: { 
        userId: a.userId,
        bettingLeagueId: a.bettingLeagueId  
      },
      defaults: a
    }).error(err => e = err)
  }

  for (let a of data.UserSettings){
    await models.userSetting.findOrCreate({
      where: { 
        userId: a.userId,
        bettingLeagueId: a.bettingLeagueId  
      },
      defaults: a
    }).error(err => e = err)
  }

  for (let a of data.MatchScorers){
    await models.matchScorer.findOrCreate({
      where: { 
        matchId: a.matchId,
        scorerId: a.scorerId  
      },
      defaults: a
    }).error(err => e = err)
  }

  for (let a of data.UserBets){
    await models.userBet.findOrCreate({
      where: { 
        matchId: a.matchId,
        userId: a.userId  
      },
      defaults: a
    }).error(err => e = err)
  }

  for (let a of data.UserSpecialBets){
    await models.userSpecialBet.findOrCreate({
      where: { 
        bettingLeagueId: a.bettingLeagueId,
        specialBetId: a.specialBetId,
        userId: a.userId,
        //if(a.specialBetId === 3){
        seriesHomeTeam: a.seriesHomeTeam,
        seriesAwayTeam: a.seriesAwayTeam
        //}
      },
      defaults: a
    }).error(err => e = err)
  }

  for (let a of data.SpecialBetsResults){
    await models.specialBetResult.findOrCreate({
      where: { 
        bettingLeagueId: a.bettingLeagueId,
        specialBetId: a.specialBetId,
        //if(a.specialBetId === 3){
        seriesHomeTeam: a.seriesHomeTeam,
        seriesAwayTeam: a.seriesAwayTeam
        //}
        
      },
      defaults: a
    }).error(err => e = err)
  }

  return e

}