import { Table, Column, Model, BelongsTo, ForeignKey, AllowNull, Is, Default } from 'sequelize-typescript'
import { isNumeric, isBoolean, isString } from '../utils/modelValidation'
import Player from './player.model'
import LeagueTeam from './leagueTeam.model'

@Table({
  timestamps: true,
  paranoid: true
})
export default class LeaguePlayer extends Model<LeaguePlayer> {
    @AllowNull(false)
    @Is('isNumeric', value => isNumeric(value))
    @ForeignKey(() => LeagueTeam)
    @Column
    leagueTeamId: number

    @BelongsTo(() => LeagueTeam)
    leagueTeam: LeagueTeam

    @AllowNull(false)
    @Is('isNumeric', value => isNumeric(value))
    @ForeignKey(() => Player)
    @Column
    playerId: number

    @BelongsTo(() => Player)
    player: Player

    @AllowNull(true)
    @Is('isNumeric', value => isNumeric(value))
    @Column
    seasonGames: number

    @AllowNull(true)
    @Is('isNumeric', value => isNumeric(value))
    @Column
    seasonGoals: number

    @AllowNull(true)
    @Is('isNumeric', value => isNumeric(value))
    @Column
    playoffAssists: number

    @AllowNull(true)
    @Is('isNumeric', value => isNumeric(value))
    @Column
    playoffGames: number

    @AllowNull(true)
    @Is('isNumeric', value => isNumeric(value))
    @Column
    playoffGoals: number

    @AllowNull(true)
    @Is('isNumeric', value => isNumeric(value))
    @Column
    seasonAssists: number

    @AllowNull(true)
    @Is('isString', value => isString(value))
    @Column
    clubName: string

    @AllowNull(false)
    @Default(false)
    @Is('isBoolean', value => isBoolean(value))
    @Column
    bestScorer: boolean

    @AllowNull(true)
    @Default(false)
    @Is('isBoolean', value => isBoolean(value))
    @Column
    secondBestScorer: boolean

    @AllowNull(true)
    @Default(false)
    @Is('isBoolean', value => isBoolean(value))
    @Column
    thirdBestScorer: boolean

    @AllowNull(true)
    @Default(false)
    @Is('isBoolean', value => isBoolean(value))
    @Column
    fourthBestScorer: boolean

}
