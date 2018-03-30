import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import UserRequest from '../models/userRequest.model'
import { IUserRequest } from '../types/models.d'

@Path('/api/user-requests')
export default class UserRequestsController {

  @Inject
  private database: Database

  @GET
  async getUserRequests(): Promise<IUserRequest[]> {
    return await this.database.models.UserRequest.findAll({})
  }

  @GET
  @Path(':id')
  async getUserRequest(@PathParam('id') userRequestId: number): Promise<IUserRequest> {
    try {
      const userRequest = await this.database.models.UserRequest.findById(userRequestId)

      if (!userRequest) {
        throw new Error('not found')
      }

      return userRequest
    } catch (e) {
      throw new Errors.NotFoundError('User request not found.')
    }
  }

  @POST
  async createUserRequest(userRequest: any): Promise<IUserRequest> {
    return await this.database.models.UserRequest.create(userRequest)
  }

  @PUT
  @Path(':id')
  async updateUserRequest(@PathParam('id') userRequestId: number, userRequest: any): Promise<IUserRequest> {
    const dbUserRequest = await this.database.models.UserRequest.findById(userRequestId)

    if (dbUserRequest) {
      return await dbUserRequest.update(userRequest)
    } else {
      return await this.database.models.UserRequest.create(userRequest)
    }
  }

  @DELETE
  @Path(':id')
  async deleteUserRequest(@PathParam('id') userRequestId: number): Promise<void> {
    const dbUserRequest = await this.database.models.UserRequest.findById(userRequestId)

    if (dbUserRequest) {
      await dbUserRequest.destroy()
    }
  }

}
