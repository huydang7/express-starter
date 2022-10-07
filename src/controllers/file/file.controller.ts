import express from 'express';
import config from '../../configs/env';
import { BadRequest } from '../../exceptions';
import { getFileUploadMiddleware } from './upload-middleware';

const router = express.Router();
const upload = getFileUploadMiddleware().single('file');

router.post('/', async (req, res, next) => {
  try {
    await upload(req, res, (err: any) => {
      if (err || !req.file) {
        throw new BadRequest(
          'Can not upload file, the file field may be missing.',
          100,
        );
      }

      return res.formatter({
        ...req.file,
        url: `${config.host_url}/${req.file.path}`,
      });
    });
  } catch (err) {
    next(err);
  }
});

export default router;
