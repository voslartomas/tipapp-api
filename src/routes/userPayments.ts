import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import UserPayment from '../models/userPayment.model'
import { IUserPayment } from '../types/models.d'

@Path('/api/userPayments')
export default class UserPaymentsController {

    @Inject
    private database: Database

    @GET
    async getUserPayments(): Promise<IUserPayment[]> {
      return await this.database.models.UserPayment.findAll({})
    }

    @GET
    @Path(':id')
    async getUserPayment(@PathParam('id') userPaymentID: number): Promise<IUserPayment> {
        try {
        const user = await this.database.models.UserPayment.findById(userPaymentID)

        if (!user) {
            throw new Error('not found')
        }

        return user
        } catch (e) {
        throw new Errors.NotFoundError('User not found.')
        }
    }

    @POST
    async createUserPayment(userPayment: any): Promise<IUserPayment> {
        return await this.database.models.UserPayment.create(userPayment)
    }

    @PUT
    @Path(':id')
    async updateUserPayment(@PathParam('id') userPaymentID: number, userPayment: any): Promise<IUserPayment> {
        const dbUserPayment = await this.database.models.UserPayment.findById(userPaymentID)

        if (dbUserPayment) {
        return await dbUserPayment.update(userPayment)
        } else {
        return await this.database.models.UserPayment.create(userPayment)
        }
    }

    @DELETE
    @Path(':id')
    async deleteUserPayment(@PathParam('id') userPaymentID: number): Promise<void> {
        const dbUserPayment = await this.database.models.UserPayment.findById(userPaymentID)

        if (dbUserPayment) {
        await dbUserPayment.destroy()
        }
    }

}