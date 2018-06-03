import { Path, GET, POST, PUT, DELETE, PathParam, Errors, Context, ServiceContext } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import User from '../models/user.model'
import { IUser, ILeague } from '../types/models.d'

@Path('/api/users')
export default class UsersController {
  @Inject
  private database: Database

  @Context
  context: ServiceContext

  private readonly ATTRIBUTES = ['id', 'firstName', 'lastName', 'username', 'email', 'mobileNumber', 'createdAt', 'updatedAt']

  @GET
  async getUsers(): Promise<IUser[]> {
    return await this.database.models.User.findAll({
      attributes: this.ATTRIBUTES
    })
  }

  @GET
  @Path('/current')
  async getCurrentUser(): Promise<IUser[]> {
    return this.context.request['user']
  }

  @GET
  @Path('/leagues')
  async getUserLeagues(): Promise<ILeague[]> {

    if (!this.context.request['user'].id) {
      throw new Errors.UnauthorizedError('You must be logged in.')
    }

    return this.database.query(`SELECT "League".* FROM "League"
      LEFT JOIN "LeagueUser" ON ("League"."id" = "LeagueUser"."leagueId" AND "LeagueUser"."userId" = ${this.context.request['user'].id})
      WHERE "LeagueUser"."admin" = 'true'`, { type: this.database.QueryTypes.SELECT})
  }

  @GET
  @Path(':id')
  async getUser(@PathParam('id') userId: number): Promise<IUser> {
    try {
      const user = await this.database.models.User.findById(userId, { attributes: this.ATTRIBUTES })

      if (!user) {
        throw new Error('not found')
      }

      return user
    } catch (e) {
      throw new Errors.NotFoundError('User not found.')
    }
  }

  @GET
  @Path('/username/:username')
  async getUserUN(@PathParam('username') username: string): Promise<IUser> {
    try {
      const user = await this.database.models.User.findOne({ where: { username } })

      if (!user) {
        throw new Error('not found')
      }

      return user
    } catch (e) {
      throw new Errors.NotFoundError('User not found.')
    }
  }

  @POST
  // TODO fix user: IUser, error while running tests
  async createUser(user: any): Promise<IUser> {
    return await this.database.models.User.create(user)
  }

  @PUT
  @Path(':id')
  async updateUser(@PathParam('id') userId: number, user: any): Promise<IUser> {
    const dbUser = await this.database.models.User.findById(userId)

    if (dbUser) {
      return await dbUser.update(user)
    } else {
      return await this.database.models.User.create(user)
    }
  }

  @DELETE
  @Path(':id')
  async deleteUser(@PathParam('id') userId: number): Promise<void> {
    const dbUser = await this.database.models.User.findById(userId)

    if (dbUser) {
      await dbUser.destroy()
    }
  }
}
