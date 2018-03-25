import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript'

@Table({
  timestamps: true,
})
export default class UserBet extends Model<UserBet> {
  @PrimaryKey
  @Column
  id: number

  @Column
  matchId: number

  @Column
  userId: number

  @Column
  dateTime: Date

  @Column
  homeScore: number

  @Column
  awayScore: number

  @Column
  homeWinner: boolean

  @Column
  scorer: number
}
