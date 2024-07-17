import fs from 'fs/promises';
import path from 'path';
import dayjs from 'dayjs';
import crypto from 'crypto';
import multer from '@koa/multer';
import { verifyToken } from '../utils/common.mjs';
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
  // 增加上传者信息
  const token = ctx.headers.authorization;
  let user = { id: null, username: null };
  if (token) {
    user = verifyToken(token);
  }
  const { folder } = ctx.request.body;
  const files = ctx.files;
  if (!files || files.length === 0) {
    ctx.body = {
      status: 'error',
      msg: '请选择上传对象',
      code: 400,
    };
    return;
  }
  if (files.length >= config.MAX_FILE_SIZE) {
    ctx.body = {
      status: 'error',
      msg: '文件大小超出限制',
      code: 400,
    };
    return;
  }
  const uploadResults = [];
  for (const file of files) {
    const { originalname, filename, path: filepath, size, mimetype: type } = file;
    const description = ctx.request.body.description || '';
    try {
      // 上传文件完处理文件地址
      let newFilepath = filepath.replace(/\\/g, '/');
      newFilepath = newFilepath.replace(/public\//, '');
      // 保存上传记录到数据库
      const uploadData = await Upload.create({
        folderType: folder || 1,
        originalname,
        filename,
        path: newFilepath,
        size,
        type,
        url: config.UPLOAD_FILE_DNS + newFilepath,
        description,
        creatorId: user.id,
        creatorName: user.username,
      });
      let successData = uploadData.toJSON();
      successData.status = 'done';
      successData.percent = 100;
      uploadResults.push(successData);
    } catch (error) {
      const errorData = {
        folderType: folder || 1,
        originalname,
        filename,
        path: '',
        size,
        type,
        url: '',
        description,
        creatorId: user.id,
        creatorName: user.username,
        status: 'error',
        response: error.message,
      };
      uploadResults.push(errorData);
    }
  }
  ctx.body = {
    status: 'success',
    msg: '文件上传完成',
    data: uploadResults,
  };
};
