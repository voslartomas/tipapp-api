import { Table, Column, Model, ForeignKey, BelongsTo, AllowNull, Is } from 'sequelize-typescript'
import { isNumeric, isDate, isBoolean } from '../utils/modelValidation'
import LeagueSpecialBetSerie from './leagueSpecialBetSerie.model'
import LeagueUser from './leagueUser.model'

@Table({
  timestamps: true,
  paranoid: true
})

export default class UserSpecialBetSerie extends Model<UserSpecialBetSerie> {
  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  @ForeignKey(() => LeagueSpecialBetSerie)
  leagueSpecialBetSerieId: number

  @BelongsTo(() => LeagueSpecialBetSerie)
  leagueSpecialBetSerie: LeagueSpecialBetSerie

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  @ForeignKey(() => LeagueUser)
  leagueUserId: number

  @BelongsTo(() => LeagueUser)
  leagueUser: LeagueUser

  @AllowNull(true)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  homeTeamScore: number

  @AllowNull(true)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  awayTeamScore: number

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  points: number = 4

  @AllowNull(false)
  @Is('isBoolean', value => isBoolean(value))
  @Column
  correctBet: boolean = false

  @AllowNull(false)
  @Is('isDate', value => isDate(value))
  @Column
  dateTime: Date
}
