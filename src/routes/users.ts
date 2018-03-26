import { Path, GET, PathParam } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import User from '../models/user.model'

@Path('/api/users')
export default class UsersController {
  @Inject
  private database: Database

  @GET
  async getUsers(): Promise<any[]> {
    return await this.database.models.User.findAll()
  }

  @GET
  @Path(':id')
  async getUser(@PathParam('id') userId: number): Promise<any> {
    return await this.database.models.User.findById(userId)
  }
}
