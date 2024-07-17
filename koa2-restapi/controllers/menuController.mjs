import { Menu, RoleMenus } from '../models/Admin.mjs';
import { buildMenuTree } from '../utils/common.mjs';
import { Op } from 'sequelize';

// 获取所有菜单
export const getMenus = async (ctx) => {
  // 条件已在前端处理了此处已屏蔽
  // const { keywords, menuType, isDisabled, isLink, isCache } = ctx.query;
  // let where = [];
  // if (isDisabled) where.push({ isDisabled });
  // if (menuType) where.push({ menuType });
  // if (isLink) where.push({ isLink });
  // if (isCache) where.push({ isCache });
  // if (keywords) {
  //   where.push({
  //     [Op.or]: [
  //       { menuName: { [Op.like]: `%${keywords}%` } },
  //       { path: { [Op.like]: `%${keywords}%` } },
  //       { component: { [Op.like]: `%${keywords}%` } },
  //       { permissions: { [Op.like]: `%${keywords}%` } },
  //     ],
  //   });
  // }
  try {
    const menus = await Menu.findAndCountAll({
      // where: { [Op.and]: where },
      order: ['sort'],
    });
    ctx.body = {
      status: 'success',
      msg: '获取列表成功',
      data: menus.rows,
      totalCount: menus.count,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 新增菜单
export const addMenu = async (ctx) => {
  const { menuName, menuType, routerName, sort, pid, icon, path, component, linkUrl, isCache, isLink, permissions, isDisabled } = ctx.request.body;
  try {
    if (!menuName) {
      ctx.body = {
        status: 'fail',
        msg: '名称是必填项',
        code: 400,
      };
      return;
    }
    const menu = await Menu.create({
      menuName,
      menuType,
      routerName,
      sort,
      pid,
      icon,
      path,
      linkUrl,
      component,
      isCache,
      isLink,
      permissions,
      isDisabled,
    });
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
      ctx.body = {
        status: 'fail',
        msg: '菜单不存在',
        code: 400,
      };
      return;
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
  const { menuName, menuType, routerName, sort, pid, icon, path, component, linkUrl, isCache, isLink, permissions, isDisabled } = ctx.request.body;
  try {
    const menu = await Menu.findByPk(id);
    if (!menu) {
      ctx.body = {
        status: 'fail',
        msg: '菜单不存在',
        code: 400,
      };
      return;
    }
    const data = { menuName, menuType, routerName, sort, pid, icon, path, component, linkUrl, isCache, isLink, permissions, isDisabled };
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
      ctx.body = {
        status: 'fail',
        msg: '菜单不存在',
        code: 400,
      };
      return;
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

// 批量删除字典
export const batchDeleteMenu = async (ctx) => {
  const { ids } = ctx.request.body;
  if (!ids) {
    ctx.body = {
      status: 'fail',
      msg: '无效参数',
      code: 400,
    };
    return;
  }
  try {
    await Menu.destroy({
      where: {
        id: ids,
      },
    });
    ctx.body = {
      status: 'success',
      msg: '批量删除成功',
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 获取菜单树形结构
export const getMenuTree = async (ctx) => {
  const { onlyMenu } = ctx.query;
  let where = {};
  if (onlyMenu) {
    where = {
      menuType: {
        [Op.or]: [1, 2],
      },
    };
  }
  try {
    const menus = await Menu.findAll({ where, order: ['sort'], raw: true });
    const menuTree = buildMenuTree(menus);
    ctx.body = {
      status: 'success',
      msg: '获取列表成功',
      data: menuTree,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};
