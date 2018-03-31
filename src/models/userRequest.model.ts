import { Table, Column, Model, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript'
import League from './league.model'
import User from './user.model'

@Table({
  timestamps: true,
})
export default class UserRequest extends Model<UserRequest> {
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
  decided: boolean

  @Column
  accepted: boolean
}
