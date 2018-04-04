import { Table, Column, Model, Default, ForeignKey, BelongsTo, AllowNull, Is } from 'sequelize-typescript'
import League from './league.model'
import User from './user.model'
import { isBoolean, isNumeric } from '../utils/modelValidation'

@Table({
  timestamps: true,
})
export default class UserRequest extends Model<UserRequest> {
  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  @ForeignKey(() => User)
  userId: number

  @BelongsTo(() => User)
  user: User

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  @ForeignKey(() => League)
  leagueId: number

  @BelongsTo(() => League)
  league: League

  @AllowNull(false)
  @Is('isBoolean', value => isBoolean(value))
  @Default(false)
  @Column
  decided: boolean

  @AllowNull(false)
  @Is('isBoolean', value => isBoolean(value))
  @Default(false)
  @Column
  accepted: boolean
}
