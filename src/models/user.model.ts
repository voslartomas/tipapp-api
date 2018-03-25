import { Table, Column, Model } from 'sequelize-typescript'

@Table({
  timestamps: true,
})
export default class User extends Model<User> {
  @Column
  firstname: string

  @Column
  lastName: string

  @Column
  username: string

  @Column
  email: string

  @Column
  password: string

  @Column
  salt: string
}
