import { Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, HasMany, Table, AllowNull, HasOne } from 'sequelize-typescript';
import User from './userModel';

@Table
class Time extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    timeId!: number;

    @Column({
        type: DataType.STRING
    })
    elapsedTime!: String

    @Column({
        type: DataType.STRING
    })
    Date!: String

    @ForeignKey(() => User) // Define the foreign key
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId!: number;

    @BelongsTo(() => User)
    user!: User; // Define the relationship

}

export default Time;