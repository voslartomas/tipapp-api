import { Path, GET, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import User from '../models/user.model'
import { IUser } from '../types/models.d'

@Path('/api/users')
export default class UsersController {
  @Inject
  private database: Database

  private readonly ATTRIBUTES = ['id', 'firstname', 'lastname', 'username', 'email', 'mobileNumber', 'createdAt', 'updatedAt']

  @GET
  async getUsers(): Promise<IUser[]> {
    return await this.database.models.User.findAll({
      attributes: this.ATTRIBUTES
    })
  }

  @GET
  @Path(':id')
  async getUser(@PathParam('id') userId: number): Promise<IUser> {
    try {
      return await this.database.models.User.findById(userId, { attributes: this.ATTRIBUTES })
    } catch (e) {
      throw new Errors.NotFoundError('User not found.')
    }
  }
}
