import { Table, Column, Model, BelongsTo, ForeignKey, AllowNull, Is } from 'sequelize-typescript'
import League from './league.model'
import SpecialBet from './specialBet.model'
import { isNumeric, isString } from '../utils/modelValidation'

// TODO: think about extended validation or better about change data model
// because columns with @AllowNull(true) are required just for some special bets
// same as the userSpecialBet.model.ts
@Table({
  timestamps: true,
})
export default class SpecialBetResult extends Model<SpecialBetResult> {
  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  @ForeignKey(() => League)
  leagueId: number

  @BelongsTo(() => League)
  league: League

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  @ForeignKey(() => SpecialBet)
  specialBetId: number

  @BelongsTo(() => SpecialBet)
  specialBet: SpecialBet

  @AllowNull(true)
  @Is('isString', value => isString(value))
  @Column
  specialBetResult: string

  @AllowNull(true)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  seriesHomeTeamId: number

  @AllowNull(true)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  seriesAwayTeamId: number

  @AllowNull(true)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  seriesHomeTeamResult: number

  @AllowNull(true)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  seriesAwayTeamResult: number
}
