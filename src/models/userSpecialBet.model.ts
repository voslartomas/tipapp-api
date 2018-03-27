import { Table, Column, Model, PrimaryKey, DataType } from 'sequelize-typescript'

@Table({
  timestamps: true,
})
export default class UserSpecialBet extends Model<UserSpecialBet> {
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

  @Column(DataType.DATE)
  dateTime: Date
}
