import { Table, Column, Model, PrimaryKey, BelongsTo, ForeignKey } from 'sequelize-typescript'
import Sport from './sport.model'

@Table({
  timestamps: true,
  paranoid: true,
})
export default class League extends Model<League> {
  @Column
  name: string

  @ForeignKey(() => Sport)
  @Column
  sportId: number

  @BelongsTo(() => Sport)
  sport: Sport

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
