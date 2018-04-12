import { Table, Column, Model, BelongsTo, ForeignKey, AllowNull, Is, Default } from 'sequelize-typescript'
import Match from './match.model'
import { isBoolean, isDate, isNumeric } from '../utils/modelValidation'
import LeagueUser from './leagueUser.model'
import LeaguePlayer from './leaguePlayer.model'

// TODO: Here could be probably the problem when league has specific settings what to bet
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
  @Column
  homeScore: number

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  awayScore: number

  @AllowNull(false)
  @Default(true)
  @Is('isBoolean', value => isBoolean(value))
  @Column
  homeWinner: boolean

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  @ForeignKey(() => LeaguePlayer)
  scorerId: number

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  pointsScorer: number = 6

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  points: number = 4

  @AllowNull(false)
  @Is('isBoolean', value => isBoolean(value))
  @Column
  correctBet: boolean = false

  @BelongsTo(() => LeaguePlayer)
  scorer: LeaguePlayer
}
