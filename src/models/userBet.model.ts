import { Table, Column, Model, PrimaryKey, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript'
import Match from './match.model'
import User from './user.model'

@Table({
  timestamps: true,
})
export default class UserBet extends Model<UserBet> {
  @Column
  @ForeignKey(() => Match)
  matchId: number

  @BelongsTo(() => Match)
  match: Match

  @Column
  @ForeignKey(() => User)
  userId: number

  @BelongsTo(() => User)
  user: User

  @Column(DataType.DATE)
  dateTime: Date

  @Column
  homeScore: number

  @Column
  awayScore: number

  @Column
  homeWinner: boolean

  @Column
  scorerId: number
}
