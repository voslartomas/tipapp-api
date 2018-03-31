import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript'

@Table({
  timestamps: true,
})
export default class UserSetting extends Model<UserSetting> {
  @Column
  userId: number

  @Column
  leagueId: number

  @Column
  emailBetNotification: boolean

  @Column
  emailRankingNotification: boolean
}
