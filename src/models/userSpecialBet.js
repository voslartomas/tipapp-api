'use strict'

module.exports = (sequelize, Sequelize) => {

  return sequelize.define('userSpecialBet', {

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    specialBetId: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },

    bettingLeagueId: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },

    userId: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },
    
    seriesHomeTeam: {
      type: Sequelize.INTEGER
    },

    seriesAwayTeam: {
      type: Sequelize.INTEGER
    },

    specialBet: {
        type: Sequelize.TEXT,
        notEmpty: true
    },

    dateTime: {
      type: Sequelize.DATE,
      notEmpty: true
    }

  })

}