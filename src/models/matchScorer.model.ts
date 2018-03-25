import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript'

@Table({
  timestamps: true,
})
export default class MatchScorer extends Model<MatchScorer> {
  @PrimaryKey
  @Column
  id: number

  @Column
  matchId: number

  @Column
  scorerId: number

  @Column
  numberOfGoals: number
}
