import { Table, Column, Model, AllowNull, NotEmpty, Is } from 'sequelize-typescript'
import { isString } from '../utils/modelValidation'

@Table({
  timestamps: true,
})
export default class SpecialBet extends Model<SpecialBet> {
  @AllowNull(false)
  @NotEmpty
  @Is('isString', value => isString(value))
  @Column
  key: string
}