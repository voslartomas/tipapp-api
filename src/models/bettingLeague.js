'use strict'
module.exports = (sequelize, Sequelize) => {

  return sequelize.define('bettingLeague', {
 
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
 
    name: {
      type: Sequelize.STRING,
      notEmpty: true
    },
 
    sport: {
      type: Sequelize.INTEGER,
      notEmpty: true,
      allowNull: false,
    },

    isActive: {
      type: Sequelize.BOOLEAN,
      notEmpty: true,
      allowNull: false
    },

    isTheMostActive: {
      type: Sequelize.BOOLEAN,
      notEmpty: true,
      allowNull: false
    },

    seasonFrom: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },

    seasonTo: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },
  
    isFinished: {
      type: Sequelize.BOOLEAN,
      notEmpty: true,
      allowNull: false
    }

  })
 
}