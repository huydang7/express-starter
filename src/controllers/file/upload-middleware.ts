import fs from 'fs';
import multer from 'multer';
import path from 'path';

export enum FileType {
  IMGS = 'imgs',
}

export const getStorageDir = (uploadSource: FileType = FileType.IMGS) => {
  const rootDir = 'files';
  return path.join(rootDir, uploadSource);
};

const initDirectories = () => {
  fs.mkdirSync(getStorageDir(FileType.IMGS), {
    recursive: true,
  });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadSource = req.query.uploadSource as FileType | undefined;
    const storageDir = getStorageDir(uploadSource);
    cb(null, storageDir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname),
    );
  },
});

let instance: any;

export const getFileUploadMiddleware = () => {
  if (!instance) {
    initDirectories();
    instance = multer({ storage });
  }
  return instance;
};
