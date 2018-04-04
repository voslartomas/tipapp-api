import { Table, Column, Model, BelongsTo, ForeignKey, AllowNull, Is } from 'sequelize-typescript'
import Match from './match.model'
import Player from './player.model'
import { isNumeric } from '../utils/modelValidation'

@Table({
  timestamps: true,
})
export default class MatchScorer extends Model<MatchScorer> {
  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  @ForeignKey(() => Match)
  matchId: number

  @BelongsTo(() => Match)
  match: Match

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @ForeignKey(() => Player)
  @Column
  scorerId: number

  @BelongsTo(() => Player)
  scorer: Player

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  numberOfGoals: number
}
