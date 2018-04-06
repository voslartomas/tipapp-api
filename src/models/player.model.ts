import { Table, Column, Model, Length, AllowNull, NotEmpty, Is, Default } from 'sequelize-typescript'
import { isBoolean, isString } from '../utils/modelValidation'

@Table({
  timestamps: true,
  paranoid: true
})
export default class Player extends Model<Player> {
  @AllowNull(false)
  @NotEmpty
  @Is('isString', value => isString(value))
  @Length({msg: 'Length of first name', min: 3, max: 50})
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
}
