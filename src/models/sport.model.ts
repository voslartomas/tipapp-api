import { Table, Column, Model, AllowNull, NotEmpty, Is } from 'sequelize-typescript'
import { isString } from '../utils/modelValidation'

@Table({
  timestamps: true,
  paranoid: true
})
export default class Sport extends Model<Sport> {
  @AllowNull(false)
  @NotEmpty
  @Is('isString', value => isString(value))
  @Column
  name: string
}
