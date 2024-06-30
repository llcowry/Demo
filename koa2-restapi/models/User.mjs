import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.mjs';
import { hashMD5 } from '../utils/common.mjs';

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-zA-Z0-9_!@#$%^&*]+$/, // 用户名验证正则
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[a-zA-Z0-9!@#$%^&*]{6,20}$/, // 密码验证正则
      },
      set(value) {
        this.setDataValue('password', hashMD5(value));
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true, // 邮箱验证
      },
    },
    nickname: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    birthday: {
      type: DataTypes.DATE,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    tel: {
      type: DataTypes.STRING,
    },
    level: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'users',
    timestamps: true,
  },
);

export { User };
