import { Table, Column, Model, BelongsTo, ForeignKey, AllowNull, Is } from 'sequelize-typescript'
import { isNumeric } from  '../utils/modelValidation'
import League from './league.model'
import Team from './team.model'

@Table({
    timestamps: true,
    paranoid: true
})
export default class LeagueTeam extends Model<LeagueTeam> {
    @AllowNull(false)
    @Is('isNumeric', value => isNumeric(value))
    @ForeignKey(() => League)
    @Column
    leagueId: number

    @BelongsTo(() => League)
    league: League

    @AllowNull(false)
    @Is('isNumeric', value => isNumeric(value))
    @ForeignKey(() => Team)
    @Column
    teamId: number

    @BelongsTo(() => Team)
    team: Team
}
