import { Table, Column, Model, BelongsTo, ForeignKey, AllowNull, NotEmpty, Is, Length } from 'sequelize-typescript'
import Sport from './sport.model'
import { isString, isNumeric, isBoolean } from  '../utils/modelValidation'

@Table({
  timestamps: true,
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
  @Column
  isActive: boolean

  @AllowNull(true)
  @Is('isBoolean', value => isBoolean(value))
  @Column
  isTheMostActive: boolean

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  seasonFrom: number

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  seasonTo: number

  @AllowNull(true)
  @Is('isBoolean', value => isBoolean(value))
  @Column
  isFinished: boolean
}
