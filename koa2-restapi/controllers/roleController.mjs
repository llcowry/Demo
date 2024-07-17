import { Role, Menu, AdminRoles, RoleMenus, Admin, Department } from '../models/Admin.mjs';
import { buildMenuTree } from '../utils/common.mjs';
import { Op } from 'sequelize';

// 获取所有角色
export const getRoles = async (ctx) => {
  const { page = 1, pageSize = 10 } = ctx.query;
  const offset = (page - 1) * pageSize;

  try {
    const roles = await Role.findAndCountAll({
      include: Menu,
      offset,
      limit: parseInt(pageSize),
    });
    ctx.body = {
      status: 'success',
      msg: '获取列表成功',
      data: roles.rows,
      totalCount: roles.count,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 新增角色
export const addRole = async (ctx) => {
  const { roleName, roleCode, description } = ctx.request.body;

  if (!roleName) {
    ctx.body = {
      status: 'error',
      msg: '名称是必填项',
      code: 400,
    };
    return;
  }

  try {
    const isExists = await Role.findOne({ where: { roleName } });
    if (isExists) {
      ctx.body = {
        status: 'error',
        msg: '名称已被占用',
        code: 400,
      };
      return;
    }
    const role = await Role.create({ roleName, roleCode, description });
    ctx.body = {
      status: 'success',
      msg: '创建成功',
      data: role,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 获取角色信息
export const getRole = async (ctx) => {
  const { id } = ctx.params;

  try {
    const role = await Role.findByPk(id, {
      include: Menu,
    });
    if (!role) {
      ctx.body = {
        status: 'error',
        msg: '角色不存在',
        code: 400,
      };
      return;
    }
    ctx.body = {
      status: 'success',
      msg: '获取信息成功',
      data: role,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 修改角色
export const updateRole = async (ctx) => {
  const { id } = ctx.params;
  const { roleName, roleCode, description } = ctx.request.body;

  try {
    const role = await Role.findByPk(id);
    if (!role) {
      ctx.body = {
        status: 'error',
        msg: '角色不存在',
        code: 400,
      };
      return;
    }
    const data = { roleName, roleCode, description };
    const updatedRole = await role.update(data);
    ctx.body = {
      status: 'success',
      msg: '更新成功',
      data: updatedRole,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 删除角色
export const deleteRole = async (ctx) => {
  const { id } = ctx.params;

  try {
    const role = await Role.findByPk(id);
    if (!role) {
      ctx.body = {
        status: 'error',
        msg: '角色不存在',
        code: 400,
      };
      return;
    }
    await AdminRoles.destroy({ where: { roleId: id } });
    await RoleMenus.destroy({ where: { roleId: id } });
    await role.destroy();
    ctx.body = {
      status: 'success',
      msg: '删除成功',
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 设置角色的所属菜单
export const setRoleMenus = async (ctx) => {
  const { id } = ctx.params;
  const { menuIds } = ctx.request.body;

  try {
    const role = await Role.findByPk(id);
    if (!role) {
      ctx.body = {
        status: 'fail',
        msg: '角色未找到',
        code: 400,
      };
      return;
    }
    if (menuIds && menuIds.length > 0) {
      await RoleMenus.destroy({ where: { roleId: id } });
      for (const menuId of menuIds) {
        await RoleMenus.create({
          roleId: role.id,
          menuId,
        });
      }
    }
    ctx.body = {
      status: 'success',
      msg: '角色所属菜单设置成功',
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 获取角色的所属菜单
export const getRoleMenus = async (ctx) => {
  const { id } = ctx.params;

  try {
    const role = await Role.findByPk(id, {
      include: {
        model: Menu,
        order: ['sort'],
      },
    });
    if (!role) {
      ctx.body = {
        status: 'fail',
        msg: '角色未找到',
        code: 400,
      };
      return;
    }
    const menus = await Menu.findAll({ where: { isDisabled: false }, order: ['sort'], raw: true });
    const menuTreeList = buildMenuTree(menus);
    const roleMenus = role.Menus;
    const selectedMenuId = roleMenus ? roleMenus.map((menu) => menu.id) : [];
    const data = { id, menuTreeList, selectedMenuId };
    ctx.body = {
      status: 'success',
      msg: '角色菜单获取成功',
      data: data,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 分页获取角色所属用户
export const getRoleAdmins = async (ctx) => {
  const { id } = ctx.params;
  const { keywords, page = 1, pageSize = 10 } = ctx.query;
  const offset = (page - 1) * pageSize;
  let where = {};
  if (keywords) {
    where = {
      [Op.or]: [
        { username: { [Op.like]: `%${keywords}%` } },
        { nickname: { [Op.like]: `%${keywords}%` } },
        { tel: { [Op.like]: `%${keywords}%` } },
        { email: { [Op.like]: `%${keywords}%` } },
      ],
    };
  }
  try {
    const role = await Role.findByPk(id);
    if (!role) {
      ctx.body = {
        status: 'fail',
        msg: '角色未找到',
        code: 400,
      };
      return;
    }
    // 获取与角色关联的所有管理员 ID
    const adminRoleMappings = await AdminRoles.findAll({
      where: { roleId: id },
      attributes: ['adminId'],
    });
    const adminIds = adminRoleMappings.map((mapping) => mapping.adminId);
    // 获取管理员总数
    const totalCount = adminIds.length;
    // 分页查询管理员
    const admins = await Admin.findAll({
      where: {
        ...where,
        id: adminIds,
      },
      include: [{ model: Department, required: false }],
      offset,
      limit: parseInt(pageSize),
    });
    // 处理管理员列表，添加部门名称字段
    const adminData = admins.map((admin) => {
      const adminJson = admin.toJSON();
      const departmentName = admin.Department ? admin.Department.deptName : null;
      return {
        ...adminJson,
        departmentName,
      };
    });
    ctx.body = {
      status: 'success',
      msg: '角色所属用户获取成功',
      data: adminData,
      totalCount,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 获取角色所属用户
export const getAllRoleAdmins = async (ctx) => {
  const { id } = ctx.params;
  try {
    const role = await Role.findByPk(id, {
      include: [
        {
          model: Admin,
          include: [{ model: Department, required: false }],
        },
      ],
    });
    if (!role) {
      ctx.body = {
        status: 'fail',
        msg: '角色未找到',
        code: 400,
      };
      return;
    }
    // 处理管理员列表，添加部门名称字段
    const admins = role.Admins.map((admin) => {
      const adminJson = admin.toJSON();
      const departmentName = admin.Department ? admin.Department.deptName : null;
      return {
        ...adminJson,
        departmentName,
      };
    });
    ctx.body = {
      status: 'success',
      msg: '角色所属用户获取成功',
      data: admins,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 批量设置角色所属用户
export const batchAddRoleAdmins = async (ctx) => {
  const { id } = ctx.params;
  const { ids } = ctx.request.body;

  try {
    const role = await Role.findByPk(id);
    if (!role) {
      ctx.body = {
        status: 'fail',
        msg: '角色未找到',
        code: 400,
      };
      return;
    }
    if (ids && ids.length > 0) {
      await AdminRoles.destroy({ where: { roleId: id } });
      for (const adminId of ids) {
        await AdminRoles.create({
          roleId: id,
          adminId,
        });
      }
    }
    ctx.body = {
      status: 'success',
      msg: '角色所属用户设置成功',
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 删除角色所属用户
export const deleteRoleAdmins = async (ctx) => {
  const { id, adminId } = ctx.params;

  try {
    const role = await Role.findByPk(id);
    if (!role) {
      ctx.body = {
        status: 'fail',
        msg: '角色未找到',
        code: 400,
      };
      return;
    }
    // 删除指定角色和管理员的关联
    await AdminRoles.destroy({ where: { roleId: id, adminId } });
    ctx.body = {
      status: 'success',
      msg: '角色所属用户删除成功',
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 批量删除角色所属用户
export const batchDeleteRoleAdmins = async (ctx) => {
  const { id } = ctx.params;
  const { ids } = ctx.request.body;

  try {
    const role = await Role.findByPk(id);
    if (!role) {
      ctx.body = {
        status: 'fail',
        msg: '角色未找到',
        code: 400,
      };
      return;
    }
    // 删除指定角色和多个管理员的关联
    await AdminRoles.destroy({ where: { roleId: id, adminId: ids } });
    ctx.body = {
      status: 'success',
      msg: '批量删除角色所属用户成功',
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};
