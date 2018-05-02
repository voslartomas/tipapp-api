import { Table, Column, Model, BelongsTo, ForeignKey, AllowNull, Is } from 'sequelize-typescript'
import { isNumeric, isDate } from '../utils/modelValidation'
import League from './league.model'
import LeagueTeam from './leagueTeam.model'
import LeaguePlayer from './leaguePlayer.model'
import SpecialBetSingle from './specialBetSingle.model'

@Table({
    timestamps: true,
    paranoid: true
})
export default class LeagueSpecialBetSingle extends Model<LeagueSpecialBetSingle> {
    @AllowNull(false)
    @Is('isNumeric', value => isNumeric(value))
    @ForeignKey(() => League)
    @Column
    leagueId: number

    @BelongsTo(() => League)
    league: League

    @AllowNull(false)
    @Is('isNumeric', value => isNumeric(value))
    @ForeignKey(() => SpecialBetSingle)
    @Column
    specialBetSingleId: number

    @BelongsTo(() => SpecialBetSingle)
    specialBetSingle: SpecialBetSingle

    @AllowNull(true)
    @Is('isNumeric', value => isNumeric(value))
    @ForeignKey(() => LeagueTeam)
    @Column
    specialBetTeamResultId: number

    @BelongsTo(() => LeagueTeam)
    specialBetTeamResult: LeagueTeam

    @AllowNull(true)
    @Is('isNumeric', value => isNumeric(value))
    @ForeignKey(() => LeaguePlayer)
    @Column
    specialBetPlayerResultId: number

    @BelongsTo(() => LeaguePlayer)
    specialBetPlayerResult: LeaguePlayer

    @AllowNull(true)
    @Is('isNumeric', value => isNumeric(value))
    @Column
    specialBetValue: number

    @AllowNull(false)
    @Is('isNumeric', value => isNumeric(value))
    @Column
    points: number

    @AllowNull(false)
    @Is('isDate', value => isDate(value))
    @Column
    dateTime: Date
}
