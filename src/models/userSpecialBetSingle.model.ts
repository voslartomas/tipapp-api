import { Table, Column, Model, ForeignKey, BelongsTo, AllowNull, Is, Default } from 'sequelize-typescript'
import { isString, isNumeric, isDate, isBoolean } from '../utils/modelValidation'
import LeagueUser from './leagueUser.model'
import LeagueSpecialBetSingle from './leagueSpecialBetSingle.model'
import LeagueTeam from './leagueTeam.model'
import LeaguePlayer from './leaguePlayer.model'

@Table({
    timestamps: true,
    paranoid: true
})
export default class UserSpecialBetSingle extends Model<UserSpecialBetSingle> {
    @AllowNull(false)
    @Is('isNumeric', value => isNumeric(value))
    @Column
    @ForeignKey(() => LeagueSpecialBetSingle)
    leagueSpecialBetSingleId: number

    @BelongsTo(() => LeagueSpecialBetSingle)
    leagueSpecialBetSingle: LeagueSpecialBetSingle

    @AllowNull(false)
    @Is('isNumeric', value => isNumeric(value))
    @Column
    @ForeignKey(() => LeagueUser)
    leagueUserId: number

    @BelongsTo(() => LeagueUser)
    leagueUser: LeagueUser

    @AllowNull(true)
    @Is('isNumeric', value => isNumeric(value))
    @ForeignKey(() => LeagueTeam)
    @Column
    teamResultId: number

    @BelongsTo(() => LeagueTeam)
    teamResult: LeagueTeam

    @AllowNull(true)
    @Is('isNumeric', value => isNumeric(value))
    @ForeignKey(() => LeaguePlayer)
    @Column
    playerResultId: number

    @BelongsTo(() => LeaguePlayer)
    playerResult: LeaguePlayer

    @AllowNull(true)
    @Is('isNumeric', value => isNumeric(value))
    @Column
    value: number

    @AllowNull(false)
    @Is('isNumeric', value => isNumeric(value))
    @Column
    points: number = 8

    @AllowNull(false)
    @Is('isBoolean', value => isBoolean(value))
    @Default(false)
    @Column
    correctBet: boolean

    @AllowNull(false)
    @Is('isNumeric', value => isNumeric(value))
    @Default(0)
    @Column
    totalPoints: number

    @AllowNull(false)
    @Is('isDate', value => isDate(value))
    @Column
    dateTime: Date
}
