'use strict'

module.exports = (sequelize, Sequelize) => {

  return sequelize.define('player', {

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    firstName: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    lastName: {
      type: Sequelize.STRING
    },

    team: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },

    seasonFrom: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },

    seasonTo: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },

    bestScorer: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },

    isActive: {
      type: Sequelize.BOOLEAN,
      notEmpty: true
    },

    // STATISTICS FROM API ???
    seasonGames: {
      type: Sequelize.INTEGER
    },

    seasonGoals: {
      type: Sequelize.INTEGER
    },

    seasonAssists: {
      type: Sequelize.INTEGER
    }

  })

}