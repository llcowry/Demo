import fs from 'fs/promises';
import { getPaginatedData, updateDataById, deleteDataById, getDataById } from '../db/mysql.mjs';

// 查看所有文件（分页处理）
export const getFiles = async (ctx) => {
  const { page = 1, pageSize = 10 } = ctx.query;
  const result = await getPaginatedData('uploads', parseInt(page), parseInt(pageSize));

  if (result.status === 'error') {
    ctx.throw(500, result.msg);
  }

  ctx.body = {
    status: 'success',
    msg: '获取文件列表成功',
    data: result.data,
    totalCount: result.totalCount,
  };
};

// 修改文件信息
export const updateFile = async (ctx) => {
  const { id } = ctx.params;
  const { description } = ctx.request.body;

  const existingFile = await getDataById('uploads', id);
  if (existingFile.status === 'error') {
    ctx.throw(400, '文件不存在');
  }

  const result = await updateDataById('uploads', id, { description });

  if (result.status === 'error') {
    ctx.throw(500, result.msg);
  }

  ctx.body = {
    status: 'success',
    msg: '文件信息更新成功',
  };
};

// 删除文件和记录
export const deleteFile = async (ctx) => {
  const { id } = ctx.params;

  const existingFile = await getDataById('uploads', id);
  if (existingFile.status === 'error') {
    ctx.throw(400, '文件不存在');
  }

  try {
    await fs.unlink(existingFile.data[0].path); // 删除文件
  } catch (err) {
    if (err.code !== 'ENOENT') { // ENOENT 表示文件不存在
      ctx.throw(500, `删除文件时发生错误：${err.message}`);
    }
  }

  const result = await deleteDataById('uploads', id);

  if (result.status === 'error') {
    ctx.throw(500, result.msg);
  }

  ctx.body = {
    status: 'success',
    msg: '文件和记录删除成功',
  };
};
