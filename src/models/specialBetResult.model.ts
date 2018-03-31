import { Table, Column, Model, PrimaryKey, BelongsTo, ForeignKey } from 'sequelize-typescript'
import League from './league.model'
import SpecialBet from './specialBet.model'

@Table({
  timestamps: true,
})
export default class SpecialBetResult extends Model<SpecialBetResult> {
  @Column
  @ForeignKey(() => League)
  leagueId: number

  @BelongsTo(() => League)
  league: League

  @Column
  @ForeignKey(() => SpecialBet)
  specialBetId: number

  @BelongsTo(() => SpecialBet)
  specialBet: SpecialBet

  @Column
  seriesHomeTeam: number

  @Column
  seriesAwayTeam: number

  @Column
  specialBetResult: string

}
