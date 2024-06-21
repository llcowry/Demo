// middlewares/uploadHandler.mjs
import fs from 'fs/promises';
import path from 'path';
import { format } from 'date-fns';
import crypto from 'crypto';
import multer from '@koa/multer';
import { insertData } from '../db/mysql.mjs';

// Configure multer storage
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join('./uploads', format(new Date(), 'yyyy-MM-dd'));
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

const upload = multer({ storage });

export const uploadHandler = upload.single('file');

export const saveUploadInfo = async (ctx) => {
  const file = ctx.file;
  if (!file) {
    ctx.throw(400, 'No file uploaded');
  }

  const result = await insertData('uploads', {
    filename: file.filename,
    path: file.path,
    uploaded_at: new Date(),
  });

  ctx.body = {
    status: result.status,
    msg: result.msg,
    data: result.status === 'success' ? { filename: file.filename, path: file.path } : null,
  };
};
