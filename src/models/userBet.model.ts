import { Table, Column, Model, BelongsTo, ForeignKey, AllowNull, Is } from 'sequelize-typescript'
import Match from './match.model'
import User from './user.model'
import Player from './player.model'
import { isBoolean, isDate, isNumeric } from '../utils/modelValidation'

// TODO: Here could be probably the problem when league has specific settings what to bet
@Table({
  timestamps: true,
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
  @ForeignKey(() => User)
  userId: number

  @BelongsTo(() => User)
  user: User

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
  @Is('isBoolean', value => isBoolean(value))
  @Column
  homeWinner: boolean

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  @ForeignKey(() => Player)
  scorerId: number

  @BelongsTo(() => Player)
  player: Player
}
