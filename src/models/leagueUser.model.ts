import { Table, Column, Model, BelongsTo, ForeignKey, AllowNull, Is, Default, HasMany } from 'sequelize-typescript'
import { isNumeric, isBoolean } from  '../utils/modelValidation'
import League from './league.model'
import UserBet from './userBet.model'
import User from './user.model'

@Table({
    timestamps: true,
    paranoid: true
})
export default class LeagueUser extends Model<LeagueUser> {
    @AllowNull(false)
    @Is('isNumeric', value => isNumeric(value))
    @ForeignKey(() => League)
    @Column
    leagueId: number

    @BelongsTo(() => League)
    league: League

    @HasMany(() => UserBet)
    bets: UserBet

    @AllowNull(false)
    @Is('isNumeric', value => isNumeric(value))
    @ForeignKey(() => User)
    @Column
    userId: number

    @BelongsTo(() => User)
    user: User

    @AllowNull(false)
    @Is('isBoolean', value => isBoolean(value))
    @Default(false)
    @Column
    paid: boolean

    @AllowNull(true)
    @Is('isBoolean', value => isBoolean(value))
    @Default(true)
    @Column
    active: boolean
}
