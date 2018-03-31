import { Table, Column, Model, PrimaryKey, BelongsTo, ForeignKey } from 'sequelize-typescript'
import Match from './match.model'

@Table({
  timestamps: true,
})
export default class MatchScorer extends Model<MatchScorer> {
  @Column
  @ForeignKey(() => Match)
  matchId: number

  @BelongsTo(() => Match)
  match: Match

  @Column
  scorerId: number

  @Column
  numberOfGoals: number
}
