import { Path, POST, FormParam } from 'typescript-rest'

@Path('/')
export class LoginController {
  @Path('/login')
  @POST
  /**
   * @param  {string}  username Username
   * @param  {string}  password User's password
   * @return {string}           Generated jwt token
   */
  login(@FormParam('username') username: string, @FormParam('password') password: string): string {
    return 'pong'
  }

  @Path('/register')
  @POST
  /**
   * @param {string} email      User's email address
   * @param {string} username   Username
   * @param {string} firstname  Firstname
   * @param {string} lastname   Lastname
   * @param {string} password   Passoword (should confirm password as well)
   * @return
   */
  register(
    @FormParam('email') email: string,
    @FormParam('username') username: string,
    @FormParam('firstname') firstname: string,
    @FormParam('lastname') lastname: string,
    @FormParam('password') password: string
  ): string {
    return 'pong'
  }
}
