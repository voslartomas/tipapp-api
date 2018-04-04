import { Table, Column, Model, ForeignKey, BelongsTo, AllowNull, Is } from 'sequelize-typescript'
import League from './league.model'
import User from './user.model'
import SpecialBet from './specialBet.model'
import { isString, isNumeric, isDate } from '../utils/modelValidation'

@Table({
  timestamps: true,
})
// TODO: think about extended validation or better about change data model
// because columns with @AllowNull(true) are required just for some special bets
export default class UserSpecialBet extends Model<UserSpecialBet> {
  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  @ForeignKey(() => SpecialBet)
  specialBetId: number

  @BelongsTo(() => SpecialBet)
  specialBet: SpecialBet

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
  @Is('isNumeric', value => isNumeric(value))
  @Column
  seriesHomeTeamId: number

  @AllowNull(true)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  seriesAwayTeamId: number

  @AllowNull(true)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  seriesHomeTeamBet: number

  @AllowNull(true)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  seriesAwayTeamBet: number

  @AllowNull(true)
  @Is('isString', value => isString(value))
  @Column
  value: string

  @AllowNull(false)
  @Is('isDate', value => isDate(value))
  @Column
  dateTime: Date
}
