import { DataTypes, Model } from 'sequelize';
import { sequelizeConnection } from '../services/Connection';

class Profile extends Model {
  declare id: number;

  declare firstName: string;

  declare lastName: string;

  declare profession: string;

  declare balance: number;

  declare type: 'client' | 'contractor';

  isClient(): boolean {
    return this.type === 'client';
  }

  isContractor(): boolean {
    return this.type === 'contractor';
  }
}

Profile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(12, 2),
    },
    type: {
      type: DataTypes.ENUM('client', 'contractor'),
    },
  },
  {
    sequelize: sequelizeConnection,
  },
);

export default Profile;
