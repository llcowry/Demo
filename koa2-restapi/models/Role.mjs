import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.mjs';

const Role = sequelize.define(
  'Role',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    menuIds: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        const value = this.getDataValue('menuIds');
        return value ? value.split(',') : [];
      },
      set(value) {
        this.setDataValue('menuIds', value.join(','));
      },
    },
  },
  {
    tableName: 'roles',
    timestamps: true,
  },
);

export { Role };
