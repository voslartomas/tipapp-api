import { Table, Column, Model, PrimaryKey, BelongsTo, ForeignKey } from 'sequelize-typescript'
import League from './league.model'
import Sport from './sport.model'

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
  @ForeignKey(() => Sport)
  sportId: number

  @BelongsTo(() => Sport)
  sport: Sport

  @Column
  @ForeignKey(() => League)
  leagueId: number

  @BelongsTo(() => League)
  league: League
}
