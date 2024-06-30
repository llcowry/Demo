import { Role } from '../models/Role.mjs';

// 获取所有角色
export const getRoles = async (ctx) => {
  const { page = 1, pageSize = 10 } = ctx.query;
  const offset = (page - 1) * pageSize;

  try {
    const roles = await Role.findAndCountAll({
      offset,
      limit: parseInt(pageSize),
    });
    ctx.body = {
      status: 'success',
      msg: '获取列表成功',
      data: roles.rows,
      totalCount: roles.count,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 新增角色
export const addRole = async (ctx) => {
  const { roleName, roleCode, description } = ctx.request.body;

  if (!roleName) {
    ctx.throw(400, '角色名称是必需的');
  }

  try {
    const isExists = await Role.findOne({ where: { roleName } });
    if (isExists) {
      ctx.throw(400, '角色名称已被占用');
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
    const role = await Role.findByPk(id);
    if (!role) {
      ctx.throw(400, '角色不存在');
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
      ctx.throw(400, '角色不存在');
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
      ctx.throw(400, '角色不存在');
    }
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
      ctx.throw(404, '角色未找到');
    }
    const updatedRole = await role.update({ menuIds });
    ctx.body = {
      status: 'success',
      msg: '角色菜单设置成功',
      data: updatedRole,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};
