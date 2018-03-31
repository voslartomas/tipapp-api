import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript'

@Table({
  timestamps: true,
})
export default class UserRequest extends Model<UserRequest> {
  @Column
  userId: number

  @Column
  leagueId: number

  @Column
  decided: boolean

  @Column
  accepted: boolean
}
