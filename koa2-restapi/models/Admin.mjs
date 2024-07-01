import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.mjs';
import { hashMD5 } from '../utils/common.mjs';

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
      allowNull: true,
      validate: {
        isEmail: true,
      },
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
    // roleId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    // menuIds: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   get() {
    //     const value = this.getDataValue('menuIds');
    //     return value ? value.split(',') : [];
    //   },
    //   set(value) {
    //     this.setDataValue('menuIds', value.join(','));
    //   },
    // },
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
    sort: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    pid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    path: {
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
    isCache: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isLink: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    status: {
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

export { Admin, Role, Menu, AdminRoles, RoleMenus };
