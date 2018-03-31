import { Table, Column, Model, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript'
import User from './user.model'
import League from './league.model'

@Table({
  timestamps: true,
})
export default class UserPayment extends Model<UserPayment> {
  @Column
  @ForeignKey(() => User)
  userId: number

  @BelongsTo(() => User)
  user: User

  @Column
  @ForeignKey(() => League)
  leagueId: number

  @BelongsTo(() => League)
  league: League

  @Column
  paid: boolean

  @Column
  displayed: boolean
}
