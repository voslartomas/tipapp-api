'use strict'

module.exports = (sequelize, Sequelize) => {

  return sequelize.define('team', {

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    czName: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    engName: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    value: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    shortcut: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    sport: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },

    league: {
      type: Sequelize.STRING,
      notEmpty: true
    }
  })

}