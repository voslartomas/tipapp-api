'use strict'

module.exports = (sequelize, Sequelize) => {
 
  return sequelize.define('matchScorer', {
 
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    matchId: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },
 
    scorerId: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },

    numberOfGoals: {
      type: Sequelize.INTEGER,
      notEmpty: true
    }

  })
 
}