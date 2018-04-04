import { Table, Column, Model, AllowNull, IsEmail, Is, NotEmpty, Length } from 'sequelize-typescript'
import { isString, isCzechMobileNumber } from  '../utils/modelValidation'

@Table({
  timestamps: true,
})

export default class User extends Model<User> {
  @AllowNull(false)
  @NotEmpty
  @Is('isString', value => isString(value))
  @Length({msg: 'Length of first name', min: 3, max: 50})
  @Column
  firstname: string

  @AllowNull(false)
  @NotEmpty
  @Is('isString', value => isString(value))
  @Length({msg: 'Length of last name', min: 3, max: 50})
  @Column
  lastname: string

  @AllowNull(false)
  @NotEmpty
  @Is('isString', value => isString(value))
  @Length({msg: 'Length of user name', min: 3, max: 50})
  @Column
  username: string

  @AllowNull(false)
  @NotEmpty
  @IsEmail
  @Column
  email: string

  @AllowNull(false)
  @NotEmpty
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
}