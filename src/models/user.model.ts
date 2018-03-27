import { Table, Column, Model } from 'sequelize-typescript'

@Table({
  timestamps: true,
})
export default class User extends Model<User> {
  @Column
  firstname: string

  @Column
  lastname: string

  @Column
  username: string

  @Column
  email: string

  @Column
  mobileNumber: string

  @Column
  password: string

  @Column
  salt: string
}
