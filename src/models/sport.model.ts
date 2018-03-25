import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript'

@Table({
  timestamps: true,
})
export default class Sport extends Model<Sport> {

  @PrimaryKey
  @Column
  id: number

  @Column
  czName: string

  @Column
  engName: string

  @Column
  value: string

}