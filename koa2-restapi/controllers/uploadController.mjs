import fs from 'fs/promises';
import path from 'path';
import moment from 'moment';
import crypto from 'crypto';
import multer from '@koa/multer';
import config from '../config/config.mjs';
import { insertData, getPaginatedData, updateDataById, deleteDataById, getDataById } from '../db/mysql.mjs';

// 配置 multer 存储路径和文件命名规则
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(`./${config.UPLOAD_DIR}`, moment().format('YYYY-MM-DD'));
    await fs.mkdir(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const md5 = crypto.createHash('md5').update(file.originalname + Date.now()).digest('hex');
    cb(null, `${md5}${ext}`);
  },
});

// 使用配置好的 storage 创建 multer 实例
const upload = multer({ storage });

// 处理文件上传的中间件函数，支持多文件上传，接收的字段名为 'files'
export const uploadHandler = upload.array('files');

// 处理文件上传信息保存到数据库的函数
export const saveUploadInfo = async (ctx) => {
  const files = ctx.files;

  if (!files || files.length === 0) {
    ctx.throw(400, 'No files uploaded');
  }

  const uploadResults = [];

  for (const file of files) {
    const { originalname, filename, path: filepath, size, mimetype: type } = file;
    const description = ctx.request.body.description || '';

    const result = await insertData('uploads', {
      original_filename: originalname,
      current_filename: filename,
      path: filepath,
      size,
      type,
      description,
      uploaded_at: new Date(),
    });

    uploadResults.push({
      status: result.status,
      msg: result.msg,
      data: result.status === 'success' ? { originalname, filename, path: filepath, size, type } : null,
    });
  }

  ctx.body = {
    status: 'success',
    msg: '文件上传和数据保存成功',
    data: uploadResults,
  };
};

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
