import { Table, Column, Model, Length, BelongsTo, ForeignKey, AllowNull, Default, NotEmpty, Is } from 'sequelize-typescript'
import League from './league.model'
import { isNumeric, isString, isBoolean } from '../utils/modelValidation'

@Table({
  timestamps: true,
  paranoid: true
})
export default class Evaluator extends Model<Evaluator> {
  @AllowNull(false)
  @NotEmpty
  @Is('isString', value => isString(value))
  @Column
  name: string

  @AllowNull(false)
  @Is('isString', value => isString(value))
  @Column
  type: string

  @AllowNull(false)
  @NotEmpty
  @Is('isNumeric', value => isNumeric(value))
  @Column
  points: string

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  @ForeignKey(() => League)
  leagueId: number

  @BelongsTo(() => League)
  league: League

  @AllowNull(false)
  @Default('match') // matches or series
  @Is('isString', value => isString(value))
  @Column
  entity: string
}
