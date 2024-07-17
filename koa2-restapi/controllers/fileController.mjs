import fs from 'fs/promises';
import path from 'path';
import { Upload } from '../models/Upload.mjs';
import { Op } from 'sequelize';
import { checkFileExists } from '../utils/common.mjs';

// 查看所有文件（分页处理）
export const getFiles = async (ctx) => {
  const { folderType, filename, creatorName, createdAtBegin, createdAtEnd, page = 1, pageSize = 10 } = ctx.query;
  const offset = (page - 1) * pageSize;
  let where = {};
  if (folderType) where.folderType = folderType;
  if (filename) where.filename = { [Op.like]: `%${filename}%` };
  if (creatorName) where.creatorName = { [Op.like]: `%${creatorName}%` };
  if (createdAtBegin && createdAtEnd) {
    where.createdAt = { [Op.between]: [createdAtBegin, createdAtEnd] };
  }
  try {
    const result = await Upload.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      offset,
      limit: parseInt(pageSize),
    });
    ctx.body = {
      status: 'success',
      msg: '获取列表成功',
      data: result.rows,
      totalCount: result.count,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 获取文件地址
export const getFilePath = async (ctx) => {
  const { id } = ctx.query;
  try {
    const result = await Upload.findByPk(id);
    ctx.body = {
      status: 'success',
      msg: '获取成功',
      data: result.url,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 下载文件流
export const downloadFile = async (ctx) => {
  const { id } = ctx.query;
  try {
    const result = await Upload.findByPk(id);
    if (!result) {
      ctx.body = {
        status: 'error',
        msg: '文件记录已不存在',
        code: 400,
      };
      return;
    }
    const filePath = path.resolve('public', result.path);
    const fileName = path.basename(filePath);
    if (!(await checkFileExists(filePath))) {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        msg: '文件不存在',
        code: 400,
      };
      return;
    }
    ctx.set('Content-Disposition', `attachment; filename="${encodeURIComponent(fileName)}"`);
    ctx.set('Content-Type', 'application/octet-stream');
    const fileBuffer = await fs.readFile(filePath);
    ctx.body = fileBuffer;
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
      ctx.body = {
        status: 'error',
        msg: '文件不存在',
        code: 400,
      };
      return;
    }
    const updatedFile = await file.update({ description });
    ctx.body = {
      status: 'success',
      msg: '更新成功',
      data: updatedFile,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 删除文件和记录
export const deleteFile = async (ctx) => {
  const { id } = ctx.params;

  try {
    const result = await Upload.findByPk(id);
    if (!result) {
      ctx.body = {
        status: 'error',
        msg: '文件不存在',
      };
      return;
    }
    const filePath = path.resolve('public', result.path);
    // 删除文件
    if (await checkFileExists(filePath)) {
      try {
        await fs.unlink(filePath);
      } catch (err) {
        ctx.throw(400, `删除文件时发生错误：${err.message}`);
      }
    }
    // 删除记录
    await result.destroy();
    ctx.body = {
      status: 'success',
      msg: '文件删除成功',
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 删除附件中关联的上传文件和记录
export const deleteUploadFiles = async (ctx, attachments) => {
  for (const item of attachments) {
    const res = await Upload.findOne({ where: { id: item.id }, raw: true });
    if (res) {
      const filePath = path.resolve('public', res.path);
      try {
        await fs.unlink(filePath);
      } catch (err) {
        ctx.throw(400, `删除文件时发生错误：${err.message}`);
      }
      await Upload.destroy({ where: { id: item.id } });
    }
  }
};
