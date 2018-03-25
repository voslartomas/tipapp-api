'use strict'

module.exports = (sequelize, Sequelize) => {
 
  return sequelize.define('specialBet', {
 
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
 
    key: {
      type: Sequelize.STRING,
      notEmpty: true
    }
    
  })
 
}