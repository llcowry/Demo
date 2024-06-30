import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.mjs';

const Dict = sequelize.define(
  'Dict',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    keyCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    keyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'dicts',
    timestamps: true,
  },
);

export { Dict };
