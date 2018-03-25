'use strict'

module.exports = (sequelize, Sequelize) => {
 
  return sequelize.define('userSetting', {
 
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    userId: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },
 
    bettingLeagueId: {
      type: Sequelize.INTEGER,
      notEmpty: true

    },

    emailBetNotification: {
      type: Sequelize.BOOLEAN
    },

    emailRankingNotification: {
      type: Sequelize.BOOLEAN
    }

  })
 
}