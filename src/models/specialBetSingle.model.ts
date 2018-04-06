import { Table, Column, Model, BelongsTo, ForeignKey, AllowNull, Is } from 'sequelize-typescript'
import SpecialBet from './specialBetSingle.model'
import { isNumeric, isString } from '../utils/modelValidation'
import Sport from './sport.model'

@Table({
  timestamps: true,
  paranoid: true
})
export default class SpecialBetSingle extends Model<SpecialBetSingle> {
  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  @ForeignKey(() => Sport)
  sportId: number

  @BelongsTo(() => Sport)
  sport: Sport

  // 1 - player, 2 - team, 3 - values
  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  @ForeignKey(() => SpecialBet)
  specialBetType: number

  @AllowNull(false)
  @Is('isString', value => isString(value))
  @Column
  name: string
}
