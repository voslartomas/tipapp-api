import { Singleton } from 'typescript-ioc'
import { Sequelize } from 'sequelize-typescript'
import * as config from 'config'

@Singleton
export default class Database extends Sequelize {
  constructor() {
    super(config.db)

    this.addModels([__dirname + '/../models/*.model.js'])
  }
}
