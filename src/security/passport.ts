import { Inject, Singleton } from 'typescript-ioc'
const passportJWT = require('passport-jwt')
const passport = require('passport')
import Database from '../services/database'

@Singleton
export default class JWTPassport {
  private passport

  private jwtOptions: any = {}

  @Inject
  private database: Database

  constructor() {
    const ExtractJwt = passportJWT.ExtractJwt
    const JwtStrategy = passportJWT.Strategy

    this.jwtOptions['jwtFromRequest'] = ExtractJwt.fromAuthHeaderAsBearerToken()
    this.jwtOptions['secretOrKey'] = 'tipapp-fjroeko45872mci485,fj'

    const strategy = new JwtStrategy(this.jwtOptions, async (jwt_payload, next) => {
      const user = await this.database.models.User.findById(jwt_payload.id)
      if (user) {
        next(undefined, user)
      } else {
        next(undefined, false)
      }
    })

    this.passport = passport
    this.passport.use(strategy)

    this.passport.serializeUser((userModel, done) => done(undefined, userModel.id))
    this.passport.deserializeUser(async (id, done) => {
      const user = await this.database.models.User.findById(id)
      user ? done(undefined, user) : done(user.errors, undefined)
    })
  }

  getJwtOptions(): any {
    return this.jwtOptions
  }

  getPassport(): any {
    return this.passport
  }
}
