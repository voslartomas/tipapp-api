import { Table, Column, Model, BelongsTo, ForeignKey, AllowNull, Is, Default } from 'sequelize-typescript'
import Match from './match.model'
import { isBoolean, isDate, isNumeric } from '../utils/modelValidation'
import LeagueUser from './leagueUser.model'
import LeaguePlayer from './leaguePlayer.model'

@Table({
  timestamps: true,
  paranoid: true
})
export default class UserBet extends Model<UserBet> {
  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  @ForeignKey(() => Match)
  matchId: number

  @BelongsTo(() => Match)
  match: Match

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  @ForeignKey(() => LeagueUser)
  leagueUserId: number

  @BelongsTo(() => LeagueUser)
  user: LeagueUser

  @AllowNull(false)
  @Is('isDate', value => isDate(value))
  @Column
  dateTime: Date

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Default(0)
  @Column
  homeScore: number

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Default(0)
  @Column
  awayScore: number

  @AllowNull(false)
  @Default(true)
  @Is('isBoolean', value => isBoolean(value))
  @Column
  homeWinner: boolean

  @AllowNull(true)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  @ForeignKey(() => LeaguePlayer)
  scorerId: number

  @BelongsTo(() => LeaguePlayer)
  scorer: LeaguePlayer

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Default(0)
  @Column
  totalPoints: number

  @AllowNull(false)
  @Default(false)
  @Is('isBoolean', value => isBoolean(value))
  @Column
  overtime: boolean
}
