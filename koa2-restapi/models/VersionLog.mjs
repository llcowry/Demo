import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../db/database.mjs';

const VersionLog = sequelize.define(
  'VersionLog',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    version: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    publishDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
  },
  {
    tableName: 'version_logs',
    timestamps: true,
  },
);

export default VersionLog;
