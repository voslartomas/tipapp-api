import { Table, Column, Model, ForeignKey, BelongsTo, AllowNull, Is, Default } from 'sequelize-typescript'
import League from './league.model'
import { isNumeric, isBoolean } from  '../utils/modelValidation'
import LeagueUser from './leagueUser.model'

@Table({
  timestamps: true,
  paranoid: true
})
export default class UserSetting extends Model<UserSetting> {
  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  @ForeignKey(() => LeagueUser)
  leagueUserId: number

  @BelongsTo(() => LeagueUser)
  user: LeagueUser

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  @ForeignKey(() => League)
  leagueId: number

  @BelongsTo(() => League)
  league: League

  @AllowNull(true)
  @Is('isBoolean', value => isBoolean(value))
  @Default(false)
  @Column
  emailBetNotification: boolean

  @AllowNull(true)
  @Is('isNumeric', value => isNumeric(value))
  @Default(0)
  @Column
  emailBetNotificationValue: number

  @AllowNull(true)
  @Is('isBoolean', value => isBoolean(value))
  @Default(false)
  @Column
  emailRankingNotification: boolean

  @AllowNull(true)
  @Is('isNumeric', value => isNumeric(value))
  @Default(0)
  @Column
  emailRankingNotificationValue: number
}
