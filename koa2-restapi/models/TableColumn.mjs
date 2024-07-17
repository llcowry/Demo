import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.mjs';

const TableColumn = sequelize.define(
  'TableColumn',
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
    tableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    columns: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'tablecolumns',
    timestamps: true,
  },
);

export default TableColumn;
