import { DataTypes, Model } from 'sequelize';
import { sequelizeConnection } from '../services/Connection';
import Contract from './Contract';

class Job extends Model {
  declare id: number;

  declare description: string;

  declare price: number;

  declare paid: boolean;

  declare paymentDate: Date;

  declare Contract: Contract;
}

Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    paymentDate: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: sequelizeConnection,
  },
);

export default Job;
