import { Path, POST, FormParam } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
const jwt = require('jsonwebtoken')
import Database from '../services/database'

@Path('/')
export class LoginController {
  @Inject
  private database: Database

  @Path('/login')
  @POST
  /**
   * @param  {string}  user Username
   * @return {string}       Generated jwt token
   */
  async login(user: any): Promise<string> {
    console.log(user)

    const dbUser = await this.database.models.User.findOne({ where: {username: user.username} })
    console.log(dbUser)
    return 'pong'
  }

  @Path('/register')
  @POST
  /**
   * @param {string} email        User's email address
   * @param {string} username     Username
   * @param {string} firstName    First name
   * @param {string} lastName     Last name
   * @param {string} mobileNumber Mobile number
   * @param {string} password     Passoword (should confirm password as well)
   * @return
   */
  register(
    @FormParam('email') email: string,
    @FormParam('username') username: string,
    @FormParam('firstName') firstName: string,
    @FormParam('lastName') lastName: string,
    @FormParam('mobileNumber') mobileNumber: string,
    @FormParam('password') password: string
  ): string {
    return 'pong'
  }
}
