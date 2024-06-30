import fs from 'fs/promises';
import path from 'path';
import dayjs from 'dayjs';
import crypto from 'crypto';
import multer from '@koa/multer';
import { Upload } from '../models/Upload.mjs';
import config from '../config/config.mjs';

// 配置 multer 存储路径和文件命名规则
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(`./${config.UPLOAD_DIR}`, dayjs().format('YYYY-MM-DD'));
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
  },
});

// 使用配置好的 storage 创建 multer 实例
const upload = multer({ storage, limits: { fileSize: config.MAX_FILE_SIZE } });

// 处理文件上传的中间件函数，支持多文件上传，接收的字段名为 'files'
export const uploadHandler = upload.array('files');

// 处理文件上传信息保存到数据库的函数
export const saveUploadInfo = async (ctx) => {
  const files = ctx.files;

  // 检查是否有上传的文件
  if (!files || files.length === 0) {
    ctx.throw(400, '没有上传文件');
  }

  const uploadResults = [];

  for (const file of files) {
    const { originalname, filename, path: filepath, size, mimetype: type } = file;
    const description = ctx.request.body.description || '';

    try {
      const upload = await Upload.create({
        originalname,
        filename,
        path: filepath,
        size,
        type,
        description,
      });

      uploadResults.push({
        status: 'success',
        msg: '文件上传成功',
        data: upload,
      });
    } catch (error) {
      uploadResults.push({
        status: 'error',
        msg: `文件上传失败: ${error.message}`,
        data: null,
      });
    }
  }
};
