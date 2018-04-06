import { Table, Column, Model, Length, BelongsTo, ForeignKey, AllowNull, NotEmpty, Is } from 'sequelize-typescript'
import Sport from './sport.model'
import { isNumeric, isString } from '../utils/modelValidation'

@Table({
  timestamps: true,
  paranoid: true
})
export default class Team extends Model<Team> {
  @AllowNull(false)
  @NotEmpty
  @Is('isString', value => isString(value))
  @Column
  name: string

  @AllowNull(true)
  @NotEmpty
  @Is('isString', value => isString(value))
  @Column
  nickname: string

  @AllowNull(false)
  @NotEmpty
  @Is('isString', value => isString(value))
  @Length({msg: 'Length of shortcut', min: 2, max: 4})
  @Column
  shortcut: string

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  @ForeignKey(() => Sport)
  sportId: number

  @BelongsTo(() => Sport)
  sport: Sport
}
