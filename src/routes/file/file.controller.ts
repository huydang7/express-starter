import { getFileUploadMiddleware } from './upload-middleware';
import config from 'config';
import { BadRequest } from 'exceptions';
import express from 'express';

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
        url: `${config.hostUrl}/${req.file.path}`,
      });
    });
  } catch (err) {
    next(err);
  }
});

export default router;
