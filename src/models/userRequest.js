'use strict'

module.exports = (sequelize, Sequelize) => {
 
  return sequelize.define('userRequest', {
 
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

    decided: {
      type: Sequelize.BOOLEAN,
      notEmpty: true
    },

    accepted: {
      type: Sequelize.BOOLEAN
    }

  })
 
}