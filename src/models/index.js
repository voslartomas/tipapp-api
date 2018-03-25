// This file is used to import all the models we place in the models folder, and export them. 
'use strict'
 
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
//const env = process.env.NODE_ENV || 'development'
const config = require('../config/appSettings').Settings.db //[env]
const sequelize = new Sequelize(config.dialect, config.username, config.password,
  { storage: config.path, logging: config.logging, dialect: config.dialect })
const db = {}
 
sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err))

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })
 
Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})
 
db.sequelize = sequelize
db.Sequelize = Sequelize
 
module.exports = db