import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript'

@Table({
  timestamps: true,
})
export default class Player extends Model<Player> {
  @PrimaryKey
  @Column
  id: number

  @Column
  firstName: string

  @Column
  lastName: string

  @Column
  team: number

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
