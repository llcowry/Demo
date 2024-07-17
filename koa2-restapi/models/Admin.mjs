import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.mjs';

const Admin = sequelize.define(
  'Admin',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    administrator: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isDisabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: 'admins',
    timestamps: true,
  },
);

const Role = sequelize.define(
  'Role',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'roles',
    timestamps: true,
  },
);

const Menu = sequelize.define(
  'Menu',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    menuName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    menuType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    routerName: {
      type: DataTypes.STRING,
      allowNull: true,
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
    path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    component: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    permissions: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isLink: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isCache: {
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
    tableName: 'menus',
    timestamps: true,
  },
);

const AdminRoles = sequelize.define(
  'AdminRoles',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  { tableName: 'admin_roles', timestamps: true },
);

Admin.belongsToMany(Role, { through: AdminRoles, foreignKey: 'adminId' });
Role.belongsToMany(Admin, { through: AdminRoles, foreignKey: 'roleId' });

const RoleMenus = sequelize.define(
  'RoleMenus',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  { tableName: 'role_menus', timestamps: true },
);

Role.belongsToMany(Menu, { through: RoleMenus, foreignKey: 'roleId' });
Menu.belongsToMany(Role, { through: RoleMenus, foreignKey: 'menuId' });

const Department = sequelize.define(
  'Department',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    deptName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      unique: true,
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 99,
    },
  },
  {
    tableName: 'departments',
    timestamps: true,
  },
);

Admin.belongsTo(Department, { foreignKey: 'departmentId' });

export { Admin, Role, Menu, AdminRoles, RoleMenus, Department };
