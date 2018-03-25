'use strict'

module.exports = (sequelize, Sequelize) => {
 
  return sequelize.define('user', {
 
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
      type: Sequelize.STRING,
      notEmpty: true
    },
 
    username: {
      type: Sequelize.TEXT,
      notEmpty: true
    },
 
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
 
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },

    salt: {
      type: Sequelize.TEXT
    }
  })
 
}