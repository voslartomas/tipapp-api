import { Table, Column, Model, BelongsTo, ForeignKey, AllowNull, Is } from 'sequelize-typescript'
import { isNumeric, isDate } from '../utils/modelValidation'
import League from './league.model'
import LeagueTeam from './leagueTeam.model'
import Team from './team.model'
import SpecialBetSerie from './specialBetSerie.model'

@Table({
    timestamps: true,
    paranoid: true
})
export default class LeagueSpecialBetSerie extends Model<LeagueSpecialBetSerie> {
    @AllowNull(false)
    @Is('isNumeric', value => isNumeric(value))
    @ForeignKey(() => League)
    @Column
    leagueId: number

    @BelongsTo(() => League)
    league: League

    @AllowNull(false)
    @Is('isNumeric', value => isNumeric(value))
    @ForeignKey(() => SpecialBetSerie)
    @Column
    specialBetSerieId: number

    @BelongsTo(() => SpecialBetSerie)
    specialBetSerie: SpecialBetSerie

    @AllowNull(false)
    @Is('isDate', value => isDate(value))
    @Column
    dateTime: Date

    @AllowNull(false)
    @Is('isNumeric', value => isNumeric(value))
    @AllowNull(false)
    @Is('isNumeric', value => isNumeric(value))
    @ForeignKey(() => LeagueTeam)
    @Column
    homeTeamId: number

    @BelongsTo(() => LeagueTeam, 'homeTeamId')
    homeTeam: Team

    @AllowNull(false)
    @Is('isNumeric', value => isNumeric(value))
    @ForeignKey(() => LeagueTeam)
    @Column
    awayTeamId: number

    @BelongsTo(() => LeagueTeam, 'awayTeamId')
    awayTeam: LeagueTeam

    @AllowNull(true)
    @Is('isNumeric', value => isNumeric(value))
    @Column
    homeTeamScore: number

    @AllowNull(true)
    @Is('isNumeric', value => isNumeric(value))
    @Column
    awayTeamScore: number
}
