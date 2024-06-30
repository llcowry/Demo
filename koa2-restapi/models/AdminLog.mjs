import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.mjs';

const AdminLog = sequelize.define(
  'AdminLog',
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
      unique: true,
    },
    loginResult: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '0: 失败, 1: 成功',
    },
    loginIp: {
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
    tableName: 'admin_logs',
    timestamps: true,
    updatedAt: false,
  },
);

export default AdminLog;
