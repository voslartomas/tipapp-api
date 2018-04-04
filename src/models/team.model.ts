import { Table, Column, Model, Length, BelongsTo, ForeignKey, AllowNull, NotEmpty, Is } from 'sequelize-typescript'
import League from './league.model'
import Sport from './sport.model'
import { isNumeric, isString } from '../utils/modelValidation'

@Table({
  timestamps: true,
})
export default class Team extends Model<Team> {
  @AllowNull(false)
  @NotEmpty
  @Is('isString', value => isString(value))
  @Column
  czName: string

  @AllowNull(false)
  @NotEmpty
  @Is('isString', value => isString(value))
  @Column
  engName: string

  @AllowNull(false)
  @NotEmpty
  @Is('isString', value => isString(value))
  @Column
  value: string

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

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  @ForeignKey(() => League)
  leagueId: number

  @BelongsTo(() => League)
  league: League
}
