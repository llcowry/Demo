import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import multer from '@koa/multer';
import config from '../config/config.mjs';
import { insertData, getPaginatedData, updateDataById, deleteDataById, getDataById } from '../db/mysql.mjs';

// 配置 multer 存储路径和文件命名规则
const storage = multer.diskStorage({
  // 确定文件存储路径的回调函数
  destination: async (req, file, cb) => {
    // 生成上传文件的目标文件夹路径，以当前日期作为文件夹名
    const uploadDir = path.join(`./${config.UPLOAD_DIR}`, format(new Date(), 'yyyy-MM-dd'));
    // 确保目标文件夹存在，如果不存在则创建
    await fs.mkdir(uploadDir, { recursive: true });
    // 将目标文件夹路径传递给 multer
    cb(null, uploadDir);
  },
  // 确定文件名的回调函数
  filename: (req, file, cb) => {
    // 获取文件扩展名
    const ext = path.extname(file.originalname);
    // 使用文件名加上当前时间的 MD5 值作为文件名，确保文件名唯一性
    const md5 = crypto
      .createHash('md5')
      .update(file.originalname + Date.now())
      .digest('hex');
    // 将生成的文件名传递给 multer
    cb(null, `${md5}${ext}`);
  },
});

// 使用配置好的 storage 创建 multer 实例
const upload = multer({ storage });

// 处理文件上传的中间件函数，支持多文件上传，接收的字段名为 'files'
export const uploadHandler = upload.array('files');

// 处理文件上传信息保存到数据库的函数
export const saveUploadInfo = async (ctx) => {
  const files = ctx.files; // 获取上传的文件数组

  // 检查是否有上传的文件
  if (!files || files.length === 0) {
    ctx.throw(400, 'No files uploaded');
  }

  const uploadResults = []; // 用于存储每个文件上传结果的数组

  // 遍历每个上传的文件
  for (const file of files) {
    const { filename, path: filepath, size, mimetype: type } = file;
    const description = ctx.request.body.description || '';

    // 将文件信息插入数据库
    const result = await insertData('uploads', {
      filename,
      path: filepath,
      size,
      type,
      description,
      uploaded_at: new Date(),
    });

    // 构造每个文件的上传结果对象，并添加到 uploadResults 数组中
    uploadResults.push({
      status: result.status,
      msg: result.msg,
      data: result.status === 'success' ? { filename, path: filepath, size, type } : null,
    });
  }

  // 设置响应体，返回上传结果数组
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
    ctx.throw(500, `删除文件时发生错误：${err.message}`);
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