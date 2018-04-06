import { Table, Column, Model, ForeignKey, BelongsTo, AllowNull, Is } from 'sequelize-typescript'
import { isString, isNumeric, isDate } from '../utils/modelValidation'
import LeagueUser from './leagueUser.model'
import LeagueSpecialBetSingle from './leagueSpecialBetSingle.model'

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
    @Is('isString', value => isString(value))
    @Column
    bet: string

    @AllowNull(false)
    @Is('isDate', value => isDate(value))
    @Column
    dateTime: Date
}
