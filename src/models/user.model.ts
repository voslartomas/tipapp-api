import { Table, Column, Model, AllowNull, IsEmail, Is, NotEmpty, Length } from 'sequelize-typescript'
import { isString, isCzechMobileNumber } from  '../utils/modelValidation'

@Table({
  timestamps: true,
  paranoid: true
})

export default class User extends Model<User> {
  @AllowNull(false)
  @NotEmpty
  @Is('isString', value => isString(value))
  @Length({msg: 'Length of first name', min: 3, max: 50})
  @Column
  firstName: string

  @AllowNull(false)
  @NotEmpty
  @Is('isString', value => isString(value))
  @Length({msg: 'Length of last name', min: 3, max: 50})
  @Column
  lastName: string

  @AllowNull(false)
  @NotEmpty
  @Is('isString', value => isString(value))
  @Length({msg: 'Length of user name', min: 3, max: 50})
  @Column
  username: string

  @AllowNull(true)
  @IsEmail
  @Column
  email: string

  @AllowNull(true)
  @Is('isMobileNumber', value => isCzechMobileNumber(value))
  @Column
  mobileNumber: string

  @AllowNull(false)
  @NotEmpty
  @Is('isString', value => isString(value))
  @Column
  password: string

  @Column
  salt: string

  @AllowNull(true)
  @Is('isString', value => isString(value))
  @Column
  pushId: string

  @AllowNull(false)
  @Column
  notifyHours: number = 2
}
