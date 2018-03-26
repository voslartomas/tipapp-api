import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript'

@Table({
  timestamps: true,
})
export default class UserPayment extends Model<UserPayment> {
  @Column
  userId: number

  @Column
  bettingLeagueId: number

  @Column
  paid: boolean

  @Column
  displayed: boolean
}
