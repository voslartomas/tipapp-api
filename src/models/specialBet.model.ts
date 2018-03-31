import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript'

@Table({
  timestamps: true,
})
export default class SpecialBet extends Model<SpecialBet> {
  @Column
  key: string
}
