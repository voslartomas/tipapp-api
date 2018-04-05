import { Table, Column, Model, BelongsTo, ForeignKey, Length, AllowNull, NotEmpty, Is, Default } from 'sequelize-typescript'
import Team from './team.model'
import { isBoolean, isNumeric, isString } from '../utils/modelValidation'

@Table({
  timestamps: true,
})
export default class Player extends Model<Player> {
  @AllowNull(false)
  @NotEmpty
  @Is('isString', value => isString(value))
  @Length({msg: 'Length of first name', min: 3, max: 50})
  @Column
  firstName: string

  @AllowNull(false)
  @NotEmpty
  @Is('isString', value => isString(value))
  @Length({msg: 'Length of last name', min: 3, max: 50})
  @Column
  lastName: string

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  @ForeignKey(() => Team)
  teamId: number

  @BelongsTo(() => Team, 'teamId')
  team: Team

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  seasonFrom: number

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  seasonTo: number

  @AllowNull(false)
  @Default(false)
  @Is('isBoolean', value => isBoolean(value))
  @Column
  bestScorer: boolean

  @AllowNull(false)
  @Default(true)
  @Is('isBoolean', value => isBoolean(value))
  @Column
  isActive: boolean

  @AllowNull(true)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  seasonGames: number

  @AllowNull(true)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  seasonGoals: number

  @AllowNull(true)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  seasonAssists: number
}
