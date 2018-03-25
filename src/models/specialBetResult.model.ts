import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript'

@Table({
  timestamps: true,
})
export default class SpecialBetResult extends Model<SpecialBetResult> {

  @PrimaryKey
  @Column
  id: number

  @Column
  bettingLeagueId: number

  @Column
  specialBetId: number

  @Column
  seriesHomeTeam: number

  @Column
  seriesAwayTeam: number

  @Column
  specialBetResult: string

}