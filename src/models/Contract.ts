import { DataTypes, Model } from 'sequelize';
import { sequelizeConnection } from '../services/Connection';
import Profile from './Profile';

class Contract extends Model {
  declare status: 'new' | 'in_progress' | 'terminated';

  declare Contractor: Profile;
}
Contract.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    terms: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('new', 'in_progress', 'terminated'),
    },
  },
  {
    sequelize: sequelizeConnection,
  },
);

export default Contract;
