import { Table, Column, Model, ForeignKey, BelongsTo, AllowNull, Is } from 'sequelize-typescript'
import League from './league.model'
import User from './user.model'
import { isNumeric, isBoolean } from  '../utils/modelValidation'

@Table({
  timestamps: true,
})
export default class UserSetting extends Model<UserSetting> {
  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  @ForeignKey(() => User)
  userId: number

  @BelongsTo(() => User)
  user: User

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  @ForeignKey(() => League)
  leagueId: number

  @BelongsTo(() => League)
  league: League

  @AllowNull(true)
  @Is('isBoolean', value => isBoolean(value))
  @Column
  emailBetNotification: boolean

  @AllowNull(true)
  @Is('isBoolean', value => isBoolean(value))
  @Column
  emailRankingNotification: boolean
}
