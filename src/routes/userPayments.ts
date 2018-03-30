import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import UserPayment from '../models/userPayment.model'
import { IUserPayment } from '../types/models.d'

@Path('/api/user-payments')
export default class UserPaymentsController {

  @Inject
  private database: Database

  @GET
  async getUserPayments(): Promise<IUserPayment[]> {
    return await this.database.models.UserPayment.findAll({})
  }

  @GET
  @Path(':id')
  async getUserPayment(@PathParam('id') userPaymentId: number): Promise<IUserPayment> {
    try {
      const userPayment = await this.database.models.UserPayment.findById(userPaymentId)

      if (!userPayment) {
        throw new Error('not found')
      }

      return userPayment
    } catch (e) {
      throw new Errors.NotFoundError('User payment not found.')
    }
  }

  @POST
  async createUserPayment(userPayment: any): Promise<IUserPayment> {
    return await this.database.models.UserPayment.create(userPayment)
  }

  @PUT
  @Path(':id')
  async updateUserPayment(@PathParam('id') userPaymentId: number, userPayment: any): Promise<IUserPayment> {
    const dbUserPayment = await this.database.models.UserPayment.findById(userPaymentId)

    if (dbUserPayment) {
      return await dbUserPayment.update(userPayment)
    } else {
      return await this.database.models.UserPayment.create(userPayment)
    }
  }

  @DELETE
  @Path(':id')
  async deleteUserPayment(@PathParam('id') userPaymentId: number): Promise<void> {
    const dbUserPayment = await this.database.models.UserPayment.findById(userPaymentId)

    if (dbUserPayment) {
      await dbUserPayment.destroy()
    }
  }

}
