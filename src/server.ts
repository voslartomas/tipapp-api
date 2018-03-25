import * as config from 'config'
import * as express from 'express'
import { createLogger } from 'bunyan'
import * as http from 'http'
import { Inject } from 'typescript-ioc'
import AppLogger from './services/logger'
import { Server as RestServer } from 'typescript-rest'
import routes from './routes'
import { Sequelize } from 'sequelize-typescript'
import loggerMiddleware from './middlewares/logger'

export class Server {

  private app: express.Application
  private server: http.Server = undefined
  @Inject
  private logger: AppLogger

  constructor() {
    this.app = express()
    this.logger = undefined
    this.config()

    RestServer.buildServices(this.app, ...routes)

    if (config.get('swagger.enabled')) {
      RestServer.swagger(this.app, `${config.get('swagger.config_path')}`, '/api-docs', `localhost:${config.get('port')}`, ['http'])
    }

    const sequelize = new Sequelize(config.db)
    console.log(__dirname + '/models/*.model.ts')
    sequelize.addModels([__dirname + '/models/*.model.js'])

    sequelize.authenticate()

    sequelize.sync({force: true}).then(() => {
      console.log('synced')
    }).catch((e) => {
      console.error(e)
    })
  }

  public getApp() {
    return this.app
  }

  /**
   * Configure the express app.
   */
  private config(): void {
    this.app.use(loggerMiddleware(this.logger))
  }

  /**
   * Start the server
   * @returns {Promise<any>}
   */
  public start(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.server = this.app.listen(config.get('port'), (err: any) => {
        if (err) {
          return reject(err)
        }

        this.logger.info(`Listening to http://localhost:${this.server.address().port}`)
        return resolve()
      })
    })
  }

  /**
   * Stop the server (if running).
   * @returns {Promise<boolean>}
   */
  public stop(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this.server) {
        this.server.close(() => {
          return resolve(true)
        })
      } else {
        return resolve(true)
      }
    })
  }
}
