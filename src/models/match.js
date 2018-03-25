'use strict'

module.exports = (sequelize, Sequelize) => {

  return sequelize.define('match', {

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    bettingLeague: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },

    gameNumber: {
      type: Sequelize.INTEGER
    },

    dateTime: {
        type: Sequelize.DATE,
        notEmpty: true
    },

    homeTeam: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },

    awayTeam: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },

    // after regular time
    homeScore: {
      type: Sequelize.INTEGER
    },

    awayScore: {
      type: Sequelize.INTEGER
    },

    overtime: {
      type: Sequelize.BOOLEAN
    },

    shotout: {
      type: Sequelize.BOOLEAN
    },

    winner: {
      type: Sequelize.BOOLEAN
    },

    isEvaluated: {
      type: Sequelize.BOOLEAN,
      notEmpty: true
    }

  })

}