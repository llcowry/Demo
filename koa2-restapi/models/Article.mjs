import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.mjs';

const Article = sequelize.define(
  'Article',
  {
    articleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    previewImg: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    linkUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contentText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    contentHtml: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    attachment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 99,
    },
    viewCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    isHomeShow: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isRecommend: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isDisabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: 'articles',
    timestamps: true,
  },
);

const Category = sequelize.define(
  'Category',
  {
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 99,
    },
  },
  {
    tableName: 'category',
    timestamps: true,
  },
);

Article.belongsTo(Category, { foreignKey: 'categoryId', targetKey: 'categoryId', onDelete: 'SET NULL' });

export { Article, Category };
