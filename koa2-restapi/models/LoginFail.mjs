import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.mjs';

const LoginFail = sequelize.define(
  'LoginFail',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    adminName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    failCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    isLock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '0: 未锁定, 1: 已锁定',
    },
    lockBeginAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'loginfail',
    timestamps: true,
  },
);

export default LoginFail;
