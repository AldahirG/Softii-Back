import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';

interface TipAttributes {
  id: number;
  amount: number;
  method: string;
}

interface TipCreationAttributes extends Optional<TipAttributes, 'id'> {}

class Tip extends Model<TipAttributes, TipCreationAttributes> implements TipAttributes {
  public id!: number; 
  public amount!: number;
  public method!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Tip.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  method: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Tip',
  tableName: 'tips',
  timestamps: true
});

export default Tip;
