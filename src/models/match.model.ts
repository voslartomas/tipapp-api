import { Table, Column, Model, ForeignKey, BelongsTo, Is, Default, AllowNull } from 'sequelize-typescript'
import League from './league.model'
import Team from './team.model'
import { isBoolean, isNumeric, isDate } from '../utils/modelValidation'
import LeagueTeam from './leagueTeam.model'

@Table({
  timestamps: true,
  paranoid: true
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
  @ForeignKey(() => LeagueTeam)
  @Column
  homeTeamId: number

  @BelongsTo(() => LeagueTeam, 'homeTeamId')
  homeTeam: Team

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @ForeignKey(() => LeagueTeam)
  @Column
  awayTeamId: number

  @BelongsTo(() => LeagueTeam, 'awayTeamId')
  awayTeam: LeagueTeam

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
  shootout: boolean

  @AllowNull(true)
  @Is('isBoolean', value => isBoolean(value))
  @Column
  homeWinner: boolean

  @AllowNull(false)
  @Default(false)
  @Is('isBoolean', value => isBoolean(value))
  @Column
  isEvaluated: boolean

  @AllowNull(false)
  @Default(false)
  @Is('isBoolean', value => isBoolean(value))
  @Column
  isPlayoffGame: boolean

  @AllowNull(true)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  externalId: number

  @AllowNull(false)
  @Default(false)
  @Is('isBoolean', value => isBoolean(value))
  @Column
  isDoubled: boolean

  scorers: Array<Number>
}
