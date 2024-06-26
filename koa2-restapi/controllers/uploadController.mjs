import fs from 'fs/promises';
import path from 'path';
import moment from 'moment';
import crypto from 'crypto';
import multer from '@koa/multer';
import config from '../config/config.mjs';
import { insertData } from '../db/mysql.mjs';

// 配置 multer 存储路径和文件命名规则
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(`./${config.UPLOAD_DIR}`, moment().format('YYYY-MM-DD'));
    await fs.mkdir(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const md5 = crypto
      .createHash('md5')
      .update(file.originalname + Date.now())
      .digest('hex');
    cb(null, `${md5}${ext}`);
  }
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
      originalname,
      filename,
      path: filepath,
      size,
      type,
      description,
      uploaded_at: new Date()
    });

    uploadResults.push({
      status: result.status,
      msg: result.msg,
      data: result.status === 'success' ? { originalname, filename, path: filepath, size, type } : null
    });
  }

  ctx.body = {
    status: 'success',
    msg: '文件上传和数据保存成功',
    data: uploadResults
  };
};
