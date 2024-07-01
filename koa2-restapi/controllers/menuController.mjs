import { Menu, RoleMenus } from '../models/Admin.mjs';

// 获取所有菜单
export const getMenus = async (ctx) => {
  const { page = 1, pageSize = 10 } = ctx.query;
  const offset = (page - 1) * pageSize;

  try {
    const menus = await Menu.findAndCountAll({
      offset,
      limit: parseInt(pageSize),
    });
    ctx.body = {
      status: 'success',
      msg: '获取列表成功',
      data: menus.rows,
      totalCount: menus.count,
      page: parseInt(page),
      limit: parseInt(limit),
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 新增菜单
export const addMenu = async (ctx) => {
  const { menuName, menuType, sort, pid, icon, path, component, isCache, isLink, permissions, status } = ctx.request.body;

  if (!menuName) {
    ctx.throw(400, '名称是必需的');
  }

  try {
    const isExists = await Menu.findOne({ where: { menuName } });
    if (isExists) {
      ctx.throw(400, '名称已被占用');
    }
    const menu = await Menu.create({ menuName, menuType, sort, pid, icon, path, component, isCache, isLink, permissions, status });
    ctx.body = {
      status: 'success',
      msg: '创建成功',
      data: menu,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 获取菜单信息
export const getMenu = async (ctx) => {
  const { id } = ctx.params;

  try {
    const menu = await Menu.findByPk(id);
    if (!menu) {
      ctx.throw(400, '菜单不存在');
    }
    ctx.body = {
      status: 'success',
      msg: '获取信息成功',
      data: menu,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 修改菜单
export const updateMenu = async (ctx) => {
  const { id } = ctx.params;
  const { menuName, menuType, sort, pid, icon, path, component, isCache, isLink, permissions, status } = ctx.request.body;

  try {
    const menu = await Menu.findByPk(id);
    if (!menu) {
      ctx.throw(400, '菜单不存在');
    }
    const data = { menuName, menuType, sort, pid, icon, path, component, isCache, isLink, permissions, status };
    const updatedMenu = await menu.update(data);
    ctx.body = {
      status: 'success',
      msg: '更新成功',
      data: updatedMenu,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 删除菜单
export const deleteMenu = async (ctx) => {
  const { id } = ctx.params;

  try {
    const menu = await Menu.findByPk(id);
    if (!menu) {
      ctx.throw(400, '菜单不存在');
    }
    await RoleMenus.destroy({ where: { menuId: id } });
    await menu.destroy();
    ctx.body = {
      status: 'success',
      msg: '删除成功',
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};
