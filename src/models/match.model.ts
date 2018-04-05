import { Table, Column, Model, ForeignKey, BelongsTo, Is, Default, AllowNull } from 'sequelize-typescript'
import League from './league.model'
import Team from './team.model'
import { isBoolean, isNumeric, isDate } from '../utils/modelValidation'

@Table({
  timestamps: true,
})
export default class Match extends Model<Match> {
  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  @ForeignKey(() => League)
  leagueId: number

  @BelongsTo(() => League)
  league: League

  @AllowNull(true)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  gameNumber: number

  @AllowNull(false)
  @Is('isDate', value => isDate(value))
  @Column
  dateTime: Date

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @ForeignKey(() => Team)
  @Column
  homeTeamId: number

  @BelongsTo(() => Team, 'homeTeamId')
  homeTeam: Team

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @ForeignKey(() => Team)
  @Column
  awayTeamId: number

  @BelongsTo(() => Team, 'awayTeamId')
  awayTeam: Team

  @AllowNull(true)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  homeScore: number

  @AllowNull(true)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  awayScore: number

  @AllowNull(true)
  @Is('isBoolean', value => isBoolean(value))
  @Column
  overtime: boolean

  @AllowNull(true)
  @Is('isBoolean', value => isBoolean(value))
  @Column
  shotout: boolean

  @AllowNull(true)
  @Is('isBoolean', value => isBoolean(value))
  @Column
  homeWinner: boolean

  @AllowNull(false)
  @Default(false)
  @Is('isBoolean', value => isBoolean(value))
  @Column
  isEvaluated: boolean
}
