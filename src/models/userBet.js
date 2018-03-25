'use strict'

module.exports = (sequelize, Sequelize) => {

  return sequelize.define('userBet', {

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    matchId: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },

    userId: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },

    dateTime: {
        type: Sequelize.DATE,
        notEmpty: true
    },

    homeScore: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },

    awayScore: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },

    homeWinner: {
      type: Sequelize.BOOLEAN,
    },

    scorer: {
      type: Sequelize.INTEGER
    }

  })

}