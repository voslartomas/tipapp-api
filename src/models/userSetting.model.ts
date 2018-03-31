import { Table, Column, Model, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript'
import League from './league.model'
import User from './user.model'

@Table({
  timestamps: true,
})
export default class UserSetting extends Model<UserSetting> {
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
  emailBetNotification: boolean

  @Column
  emailRankingNotification: boolean
}
