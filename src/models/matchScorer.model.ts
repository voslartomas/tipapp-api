import { Table, Column, Model, BelongsTo, ForeignKey, AllowNull, Is } from 'sequelize-typescript'
import { isNumeric } from '../utils/modelValidation'
import Match from './match.model'
import LeaguePlayer from './leaguePlayer.model'

@Table({
  timestamps: true,
  paranoid: true
})
export default class MatchScorer extends Model<MatchScorer> {
  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  @ForeignKey(() => Match)
  matchId: number

  @BelongsTo(() => Match)
  match: Match

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @ForeignKey(() => LeaguePlayer)
  @Column
  scorerId: number

  @BelongsTo(() => LeaguePlayer)
  scorer: LeaguePlayer

  @AllowNull(false)
  @Is('isNumeric', value => isNumeric(value))
  @Column
  numberOfGoals: number
}
