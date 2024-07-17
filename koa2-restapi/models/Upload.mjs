import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.mjs';

const Upload = sequelize.define(
  'Upload',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    folderType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    originalname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    creatorName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'uploads',
    timestamps: true,
  },
);

export { Upload };
