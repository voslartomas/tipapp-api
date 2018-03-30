import { Path, GET, POST, PUT, DELETE, PathParam, Errors } from 'typescript-rest'
import { Inject } from 'typescript-ioc'
import Database from '../services/database'
import UserSetting from '../models/userSetting.model'
import { IUserSetting } from '../types/models.d'

@Path('/api/user-settings')
export default class UserSettingsController {

  @Inject
  private database: Database

  @GET
  async getUserSettings(): Promise<IUserSetting[]> {
    return await this.database.models.UserSetting.findAll({})
  }

  @GET
  @Path(':id')
  async getUserSetting(@PathParam('id') userSettingId: number): Promise<IUserSetting> {
    try {
      const userSetting = await this.database.models.UserSetting.findById(userSettingId)

      if (!userSetting) {
        throw new Error('not found')
      }

      return userSetting
    } catch (e) {
      throw new Errors.NotFoundError('User setting not found.')
    }
  }

  @POST
  async createUserSetting(userSetting: any): Promise<IUserSetting> {
    return await this.database.models.UserSetting.create(userSetting)
  }

  @PUT
  @Path(':id')
  async updateUserSetting(@PathParam('id') userSettingId: number, userSetting: any): Promise<IUserSetting> {
    const dbUserSetting = await this.database.models.UserSetting.findById(userSettingId)

    if (dbUserSetting) {
      return await dbUserSetting.update(userSetting)
    } else {
      return await this.database.models.UserSetting.create(userSetting)
    }
  }

  @DELETE
  @Path(':id')
  async deleteUserSetting(@PathParam('id') userSettingId: number): Promise<void> {
    const dbUserSetting = await this.database.models.UserSetting.findById(userSettingId)

    if (dbUserSetting) {
      await dbUserSetting.destroy()
    }
  }

}
