import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript'

@Table({
  timestamps: true,
})
export default class BettingLeague extends Model<BettingLeague> {

  @PrimaryKey
  @Column
  id: number

  @Column
  name: string

  @Column
  sport: number

  @Column
  isActive: boolean

  @Column
  isTheMostActive: boolean

  @Column
  seasonFrom: number

  @Column
  seasonTo: number

  @Column
  isFinished: boolean
}
