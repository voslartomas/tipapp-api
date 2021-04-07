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
import Database from './services/database'
import JWTPassport from './security/passport'
import PushNotifications from './services/pushNotifications'
import * as cors from 'cors'
import * as cron from 'node-cron'
import { AddressInfo } from 'net'

export class Server {

  private app: express.Application
  private server: http.Server = undefined
  @Inject
  private logger: AppLogger

  @Inject
  private database: Database

  @Inject
  private jwtPassport: JWTPassport

  @Inject
  private pushNotifications: PushNotifications

  constructor() {
    this.app = express()
    this.logger = undefined
    this.config()

    this.app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
      next()
    })

    if (config.get('security')) {
      this.app.get('*', (req, res, next) => {
        this.jwtPassport.getPassport().authenticate('jwt', { session: false })(req, res, next)
      })

      this.app.post('*', (req, res, next) => {
        if (req.originalUrl === '/login' || req.originalUrl === '/api/register') {
          return next()
        }

        this.jwtPassport.getPassport().authenticate('jwt', { session: false })(req, res, next)
      })

      this.app.put('*', (req, res, next) => {
        this.jwtPassport.getPassport().authenticate('jwt', { session: false })(req, res, next)
      })

      this.app.delete('*', (req, res, next) => {
        this.jwtPassport.getPassport().authenticate('jwt', { session: false })(req, res, next)
      })
    }

    RestServer.buildServices(this.app, ...routes)

    if (config.get('swagger.enabled')) {
      RestServer.swagger(this.app, { filePath: `${config.get('swagger.config_path')}`, endpoint: '/api-docs', host: `localhost:${config.get('port')}`, schemes: ['http'] })
    }
  }

  public getApp() {
    return this.app
  }

  /**
   * Configure the express app.
   */
  private config(): void {
    this.app.use(loggerMiddleware(this.logger))
    this.app.use(this.jwtPassport.getPassport().initialize())

    const options: cors.CorsOptions = {
      allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
      credentials: true,
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
      origin: config.get('origin'),
      preflightContinue: false
    }

    this.app.use(cors(options))

    this.app.options('*', cors(options))
  }

  /**
   * Start the server
   * @returns {Promise<any>}
   */
  public start(): Promise<any> {
    cron.schedule('* * * * *', () => {
      console.log('Running push notification service')
      this.pushNotifications.sendPushNotifications()
    })

    return new Promise<any>((resolve, reject) => {
      this.server = this.app.listen(config.get('port'), config.get('port'), () => {
        const { port } = this.server.address() as AddressInfo
        this.logger.info(`Listening to http://localhost:${port}`)
        return resolve(true)
      }).on('error', (err) => reject(err))
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
