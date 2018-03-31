import { Path, POST, FormParam } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
const bCrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
import JWTPassport from '../security/passport'
import Database from '../services/database'

@Path('/')
export class LoginController {
  @Inject
  private database: Database

  @Inject
  private jwtPassport: JWTPassport

  @Path('/login')
  @POST
  /**
   * @param  {string}  user Username
   * @return {string}       Generated jwt token
   */
  async login(user: any): Promise<string> {
    const dbUser = await this.database.models.User.findOne({ where: {username: user.username} })

    if (!dbUser) {
      throw new Error('User not found')
    }

    const passwordHash = await bCrypt.hashSync(user.password, dbUser.salt, undefined)
    console.log(passwordHash)
    if (passwordHash !== dbUser.password) {
      throw new Error('Invalid user password')
    }

    const payload = {id: dbUser.id}
    const token = jwt.sign(payload, this.jwtPassport.getJwtOptions()['secretOrKey'])

    return token
  }
}
