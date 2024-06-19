import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';

interface EmployeeAttributes {
  id: number;
  name: string;
  amount: number;
  tipId: number;
}

interface EmployeeCreationAttributes extends Optional<EmployeeAttributes, 'id'> {}

class Employee extends Model<EmployeeAttributes, EmployeeCreationAttributes> implements EmployeeAttributes {
  public id!: number;
  public name!: string;
  public amount!: number;
  public tipId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Employee.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  tipId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tips', 
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Employee',
  tableName: 'employees',
  timestamps: true
});

export default Employee;
