import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import UserSetting from '../models/userSetting.model'
import { IUserSetting } from '../types/models.d'

@Path('/api/userSettings')
export default class UserSettingsController {

    @Inject
    private database: Database

    @GET
    async getUserSettings(): Promise<IUserSetting[]> {
      return await this.database.models.UserSetting.findAll({})
    }

    @GET
    @Path(':id')
    async getUserSetting(@PathParam('id') userSettingID: number): Promise<IUserSetting> {
        try {
        const user = await this.database.models.UserSetting.findById(userSettingID)

        if (!user) {
            throw new Error('not found')
        }

        return user
        } catch (e) {
        throw new Errors.NotFoundError('User not found.')
        }
    }

    @POST
    async createUserSetting(userSetting: any): Promise<IUserSetting> {
        return await this.database.models.UserSetting.create(userSetting)
    }

    @PUT
    @Path(':id')
    async updateUserSetting(@PathParam('id') userSettingID: number, userSetting: any): Promise<IUserSetting> {
        const dbUserSetting = await this.database.models.UserSetting.findById(userSettingID)

        if (dbUserSetting) {
        return await dbUserSetting.update(userSetting)
        } else {
        return await this.database.models.UserSetting.create(userSetting)
        }
    }

    @DELETE
    @Path(':id')
    async deleteUserSetting(@PathParam('id') userSettingID: number): Promise<void> {
        const dbUserSetting = await this.database.models.UserSetting.findById(userSettingID)

        if (dbUserSetting) {
        await dbUserSetting.destroy()
        }
    }

}