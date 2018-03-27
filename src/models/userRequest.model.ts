import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript'

@Table({
  timestamps: true,
})
export default class UserRequest extends Model<UserRequest> {
  @Column
  userId: number

  @Column
  bettingLeagueId: number

  @Column
  decided: boolean

  @Column
  accepted: boolean
}
