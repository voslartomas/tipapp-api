'use strict'

module.exports = (sequelize, Sequelize) => {
 
  return sequelize.define('userPayment', {
 
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

    paid: {
      type: Sequelize.BOOLEAN,
      notEmpty: true
    },

    displayed: {
      type: Sequelize.BOOLEAN
    }

  })
 
}