import { Table, Column, Model, Length, AllowNull, NotEmpty, Is, Default } from 'sequelize-typescript'
import { isBoolean, isString, isNumeric } from '../utils/modelValidation'

@Table({
  timestamps: true,
  paranoid: true
})
export default class Player extends Model<Player> {
  @AllowNull(true)
  @Is('isString', value => isString(value))
  @Column
  firstName: string

  @AllowNull(true)
  @Is('isString', value => isString(value))
  @Column
  lastName: string

  @AllowNull(false)
  @Default(true)
  @Is('isBoolean', value => isBoolean(value))
  @Column
  isActive: boolean

  @AllowNull(true)
  @Is('isString', value => isString(value))
  @Column
  position: string

  @AllowNull(true)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  externalId: number
}
