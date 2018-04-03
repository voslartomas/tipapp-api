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
  gameNumber: string

  @Column(DataType.DATE)
  dateTime: Date

  @ForeignKey(() => Team)
  @Column
  homeTeamId: number

  @BelongsTo(() => Team, 'homeTeamId')
  homeTeam: Team

  @ForeignKey(() => Team)
  @Column
  awayTeamId: number

  @BelongsTo(() => Team, 'awayTeamId')
  awayTeam: Team

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
