'use strict'

module.exports = (sequelize, Sequelize) => {

  return sequelize.define('specialBetResult', {

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    bettingLeagueId: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },

    specialBetId: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },

    seriesHomeTeam: {
      type: Sequelize.INTEGER
    },

    seriesAwayTeam: {
      type: Sequelize.INTEGER
    },

    specialBetResult: {
      type: Sequelize.TEXT,
      notEmpty: true
    }

  })

}