import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.mjs';

const Config = sequelize.define(
  'Config',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    configName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    configKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    configValue: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    remark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'config',
    timestamps: true,
  },
);

export default Config;
