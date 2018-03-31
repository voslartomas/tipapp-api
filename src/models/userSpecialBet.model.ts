import { Table, Column, Model, PrimaryKey, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import League from './league.model'
import User from './user.model'
import SpecialBet from './specialBet.model'
@Table({
  timestamps: true,
})
export default class UserSpecialBet extends Model<UserSpecialBet> {
  @Column
  @ForeignKey(() => SpecialBet)
  specialBetId: number

  @BelongsTo(() => SpecialBet)
  specialBetI: SpecialBet

  @Column
  @ForeignKey(() => User)
  userId: number

  @BelongsTo(() => User)
  user: User

  @Column
  @ForeignKey(() => League)
  leagueId: number

  @BelongsTo(() => League)
  league: League

  @Column
  seriesHomeTeam: number

  @Column
  seriesAwayTeam: number

  @Column
  @ForeignKey(() => SpecialBet)
  specialBet: number

  @Column(DataType.DATE)
  dateTime: Date
}
