import { Upload } from '../models/Upload.mjs';
import fs from 'fs/promises';

// 查看所有文件（分页处理）
export const getFiles = async (ctx) => {
  const { page = 1, pageSize = 10 } = ctx.query;
  const offset = (page - 1) * pageSize;

  try {
    const result = await Upload.findAndCountAll({
      offset,
      limit: parseInt(pageSize)
    });

    ctx.body = {
      status: 'success',
      msg: '获取文件列表成功',
      data: result.rows,
      totalCount: result.count
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 修改文件信息
export const updateFile = async (ctx) => {
  const { id } = ctx.params;
  const { description } = ctx.request.body;

  try {
    const file = await Upload.findByPk(id);
    if (!file) {
      ctx.throw(400, '文件不存在');
    }
    const updatedFile = await file.update({ description });
    ctx.body = {
      status: 'success',
      msg: '文件信息更新成功',
      data: updatedFile
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 删除文件和记录
export const deleteFile = async (ctx) => {
  const { id } = ctx.params;

  try {
    const file = await Upload.findByPk(id);
    if (!file) {
      ctx.throw(400, '文件不存在');
    }
    await fs.unlink(file.path); // 删除文件
    await file.destroy(); // 删除记录
    ctx.body = {
      status: 'success',
      msg: '文件和记录删除成功'
    };
  } catch (error) {
    ctx.throw(500, `删除文件时发生错误：${error.message}`);
  }
};
