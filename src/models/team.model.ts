import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript'

@Table({
  timestamps: true,
})
export default class User extends Model<User> {
  @PrimaryKey
  @Column
  id: number

  @Column
  czName: string

  @Column
  engName: string

  @Column
  value: string

  @Column
  shortcut: string

  @Column
  sport: number

  @Column
  league: string
}