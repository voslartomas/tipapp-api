import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript'

@Table({
  timestamps: true,
})
export default class Match extends Model<Match> {
  @Column
  bettingLeague: number

  @Column
  gameNumber: number

  @Column
  dateTime: Date

  @Column
  homeTeam: number

  @Column
  awayTeam: number

  @Column
  homeScore: number

  @Column
  awayScore: number

  @Column
  overtime: boolean

  @Column
  shotout: boolean

  @Column
  winner: boolean

  @Column
  isEvaluated: boolean
}
