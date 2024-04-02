import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, HasMany, AllowNull } from 'sequelize-typescript';
import Role from './roleModel';
import Time from './timeModel';

@Table
class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    userId!: number;
    
    @Column({
      type: DataType.STRING
    })
    firstName!: string;

    @Column({
      type: DataType.STRING
    })
    lastName!: string;

    @Column({
      type: DataType.STRING
    })
    email!: string;

    @Column({
      type: DataType.STRING
    })
    password!: string;
    
    @Column({
      type: DataType.STRING 
    })
    phoneNumber!: string;

    @Column({
      type: DataType.INTEGER
    })
    otp!: number;

    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    roleId!: number;

    @BelongsTo(() => Role)
    role!: Role;

    @Column({
      type: DataType.STRING
    })
    profileName!: string;

     @HasMany(() => Time) // Define the association
    times!: Time[]; // Define the property for accessing associated time entries
}

export default User;
