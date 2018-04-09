import { Table, Column, Model, AllowNull, NotEmpty, Is } from 'sequelize-typescript'
import { isNumeric, isString } from '../utils/modelValidation'

@Table({
    timestamps: true,
    paranoid: true
})
export default class SpecialBetSerie extends Model<SpecialBetSerie> {
    // TODO: check if it is odd
    @AllowNull(false)
    @Is('isNumeric', value => isNumeric(value))
    @Column
    bestOf: number

    @AllowNull(false)
    @NotEmpty
    @Is('isString', value => isString(value))
    @Column
    name: string
}