import { Table, Column, Model, BelongsTo, ForeignKey, AllowNull, NotEmpty, Is, Length, Default } from 'sequelize-typescript'
import Sport from './sport.model'
import { isString, isNumeric, isBoolean, isYear } from  '../utils/modelValidation'

@Table({
  timestamps: true,
  paranoid: true
})
export default class League extends Model<League> {
  @AllowNull(false)
  @NotEmpty
  @Is('isString', value => isString(value))
  @Length({msg: 'Length of league name', min: 3, max: 50})
  @Column
  name: string

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @ForeignKey(() => Sport)
  @Column
  sportId: number

  @BelongsTo(() => Sport)
  sport: Sport

  @AllowNull(false)
  @Is('isBoolean', value => isBoolean(value))
  @Default(false)
  @Column
  isActive: boolean

  @AllowNull(true)
  @Is('isBoolean', value => isBoolean(value))
  @Default(false)
  @Column
  isTheMostActive: boolean

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Is('isValidYear', value => isYear(value))
  @Column
  seasonFrom: number

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Is('isValidYear', value => isYear(value))
  @Column
  seasonTo: number

  @AllowNull(true)
  @Is('isBoolean', value => isBoolean(value))
  @Default(false)
  @Column
  isFinished: boolean
}
