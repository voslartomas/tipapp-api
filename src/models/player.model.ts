import { Table, Column, Model, PrimaryKey, BelongsTo, ForeignKey } from 'sequelize-typescript'
import Team from './team.model'

@Table({
  timestamps: true,
})
export default class Player extends Model<Player> {
  @Column
  firstName: string

  @Column
  lastName: string

  @Column
  @ForeignKey(() => Team)
  teamId: number

  @BelongsTo(() => Team)
  team: Team

  @Column
  seasonFrom: number

  @Column
  seasonTo: number

  @Column
  bestScorer: number

  @Column
  isActive: boolean

  @Column
  seasonGames: number

  @Column
  seasonGoals: number

  @Column
  seasonAssists: number
}
