import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.mjs';

const OperateLog = sequelize.define(
  'OperateLog',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    adminName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    params: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    result: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '0: 失败, 1: 成功',
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userAgent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    remark: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'operate_logs',
    timestamps: true,
    updatedAt: false,
  },
);

export default OperateLog;
