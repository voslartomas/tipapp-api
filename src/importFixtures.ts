import dbDataSync from './utils/dbDataSync'
import * as config from 'config'
import { Sequelize } from 'sequelize-typescript'

const sequelize = new Sequelize(config.db)
sequelize.addModels([__dirname + '/models/*.model.js'])

sequelize.sync({ force: true }).then(() => {
  return dbDataSync(sequelize.models)
}).catch(err => console.log(err))
