import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript'

@Table({
  timestamps: true,
})
export default class UserSpecialBet extends Model<UserSpecialBet> {
  @PrimaryKey
  @Column
  id: number

  @Column
  specialBetId: number

  @Column
  bettingLeagueId: number

  @Column
  userId: number

  @Column
  seriesHomeTeam: number

  @Column
  seriesAwayTeam: number

  @Column
  specialBet: number

  @Column
  dateTime: Date
}
