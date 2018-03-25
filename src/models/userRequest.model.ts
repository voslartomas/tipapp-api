import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript'

@Table({
  timestamps: true,
})
export default class UserRequest extends Model<UserRequest> {
  @PrimaryKey
  @Column
  id: number

  @Column
  userId: number

  @Column
  bettingLeagueId: number

  @Column
  decided: boolean

  @Column
  accepted: boolean
}
