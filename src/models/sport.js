'use strict'

module.exports = (sequelize, Sequelize) => {
 
  return sequelize.define('sport', {
 
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
      type: Sequelize.TEXT,
      notEmpty: true
    }
  })
 
}