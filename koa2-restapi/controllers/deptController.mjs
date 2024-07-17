import { Department } from '../models/Admin.mjs';
import { Op } from 'sequelize';

// 获取所有部门
export const getDepts = async (ctx) => {
  const { keywords } = ctx.query;
  let where = {};
  if (keywords) {
    where = {
      deptName: { [Op.like]: `%${keywords}%` },
    };
  }
  try {
    const depts = await Department.findAll({
      where,
      order: [['sort', 'DESC']],
    });
    ctx.body = {
      status: 'success',
      msg: '获取列表成功',
      data: depts,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 构建部门树形结构的辅助函数
export const buildDeptTree = async (depts) => {
  const deptMap = {};
  const deptTree = [];
  // 第一次遍历，建立映射和基础结构
  depts.forEach((dept) => {
    deptMap[dept.id] = { ...dept, children: [] };
  });
  // 第二次遍历，建立树形结构
  depts.forEach((dept) => {
    const parent = deptMap[dept.pid];
    if (parent) {
      parent.children.push(deptMap[dept.id]);
    } else {
      deptTree.push(deptMap[dept.id]);
    }
  });
  return deptTree;
};

// 获取所有部门树形结构
export const getDeptTree = async (ctx) => {
  try {
    const depts = await Department.findAll({
      order: [['sort', 'DESC']],
      raw: true,
    });
    const deptTree = await buildDeptTree(depts);
    ctx.body = {
      status: 'success',
      msg: '获取列表成功',
      data: deptTree,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 新增部门
export const addDept = async (ctx) => {
  const { deptName, adminId, pid, sort } = ctx.request.body;

  if (!deptName) {
    ctx.body = {
      status: 'error',
      msg: '名称是必填项',
      code: 400,
    };
    return;
  }

  try {
    const isExists = await Department.findOne({ where: { deptName } });
    if (isExists) {
      ctx.body = {
        status: 'error',
        msg: '名称已被占用',
        code: 400,
      };
      return;
    }
    const dept = await Department.create({ deptName, adminId, pid, sort });
    ctx.body = {
      status: 'success',
      msg: '创建成功',
      data: dept,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 获取部门信息
export const getDept = async (ctx) => {
  const { id } = ctx.params;

  try {
    const dept = await Department.findByPk(id, {
      include: Menu,
    });
    if (!dept) {
      ctx.body = {
        status: 'error',
        msg: '部门不存在',
        code: 400,
      };
      return;
    }
    ctx.body = {
      status: 'success',
      msg: '获取信息成功',
      data: dept,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 修改部门
export const updateDept = async (ctx) => {
  const { id } = ctx.params;
  const { deptName, adminId, pid, sort } = ctx.request.body;

  try {
    const dept = await Department.findByPk(id);
    if (!dept) {
      ctx.body = {
        status: 'error',
        msg: '部门不存在',
        code: 400,
      };
      return;
    }
    const data = { deptName, adminId, pid, sort };
    const updatedDept = await dept.update(data);
    ctx.body = {
      status: 'success',
      msg: '更新成功',
      data: updatedDept,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 删除部门
export const deleteDept = async (ctx) => {
  const { id } = ctx.params;

  try {
    const dept = await Department.findByPk(id);
    if (!dept) {
      ctx.body = {
        status: 'error',
        msg: '部门不存在',
        code: 400,
      };
      return;
    }
    await dept.destroy();
    ctx.body = {
      status: 'success',
      msg: '删除成功',
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};
