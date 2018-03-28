import { Table, Column, Model, PrimaryKey, DataType } from 'sequelize-typescript'

@Table({
  timestamps: true,
})
export default class Match extends Model<Match> {
  @Column
  bettingLeague: string

  @Column
  gameNumber: string

  @Column(DataType.DATE)
  dateTime: Date

  @Column
  homeTeam: string

  @Column
  awayTeam: string

  @Column
  homeScore: string

  @Column
  awayScore: string

  @Column
  overtime: boolean

  @Column
  shotout: boolean

  @Column
  winner: boolean

  @Column
  isEvaluated: boolean
}
