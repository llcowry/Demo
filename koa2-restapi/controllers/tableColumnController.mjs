import TableColumn from '../models/TableColumn.mjs';
import { verifyToken } from '../utils/common.mjs';

// 获取表格自定义列数据信息
export const getTableColumn = async (ctx) => {
  const { id } = ctx.params;
  try {
    if (id == 'null') {
      ctx.body = {
        status: 'success',
        msg: 'tableId不能为空',
        data: '',
      };
      return;
    }
    const result = await TableColumn.findOne({ where: { tableId: id } });
    let columns = '';
    if (result) {
      columns = result.columns;
    }
    ctx.body = {
      status: 'success',
      msg: '获取信息成功',
      data: columns,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 修改表格自定义列数据
export const updateTableColumn = async (ctx) => {
  const { id } = ctx.params;
  const { tableId, columnList } = ctx.request.body;
  const token = ctx.headers.authorization;
  try {
    if (id == 'null') {
      ctx.body = {
        status: 'fail',
        msg: 'tableId不能为空',
        code: 400,
      };
      return;
    }
    const user = verifyToken(token);
    let columns = JSON.stringify(columnList);
    const data = { adminId: user.id, tableId, columns };
    const result = await TableColumn.findOne({ where: { tableId: id } });
    if (!result) {
      const saveTableColumn = await TableColumn.create(data);
      ctx.body = {
        status: 'success',
        msg: '保存成功',
        data: saveTableColumn,
      };
    } else {
      const updatedTableColumn = await result.update(data);
      ctx.body = {
        status: 'success',
        msg: '更新成功',
        data: updatedTableColumn,
      };
    }
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 删除表格自定义列数据
export const deleteTableColumn = async (ctx) => {
  const { id } = ctx.params;
  try {
    if (id == 'null') {
      ctx.body = {
        status: 'fail',
        msg: 'tableId不能为空',
        code: 400,
      };
      return;
    }
    const result = await TableColumn.findOne({ where: { tableId: id } });
    if (!result) {
      ctx.body = {
        status: 'fail',
        msg: '记录已不存在',
        code: 400,
      };
      return;
    }
    await result.destroy();
    ctx.body = {
      status: 'success',
      msg: '删除成功',
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};
