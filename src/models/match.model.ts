import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript'
import League from './league.model'
import Team from './team.model'

@Table({
  timestamps: true,
})
export default class Match extends Model<Match> {
  @Column
  @ForeignKey(() => League)
  leagueId: number

  @BelongsTo(() => League)
  league: League

  @Column
  gameNumber: number

  @Column(DataType.DATE)
  dateTime: Date

  @ForeignKey(() => Team)
  @Column
  homeTeamId: number

  @BelongsTo(() => Team)
  homeTeam: Team

  @ForeignKey(() => Team)
  @Column
  awayTeamId: number

  @BelongsTo(() => Team)
  awayTeam: Team

  @Column
  homeScore: number

  @Column
  awayScore: number

  @Column
  overtime: boolean

  @Column
  shotout: boolean

  @Column
  homeWinner: boolean

  @Column
  isEvaluated: boolean
}
