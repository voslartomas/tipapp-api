import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript'

@Table({
  timestamps: true,
})
export default class Team extends Model<Team> {
  @Column
  czName: string

  @Column
  engName: string

  @Column
  value: string

  @Column
  shortcut: string

  @Column
  sport: number

  @Column
  league: string
}
