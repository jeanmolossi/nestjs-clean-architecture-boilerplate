import { mkdir } from 'fs';
import multer from 'multer';
import { filename, IMulterConfig } from './multer.config';

export function makeMulterStorage(): IMulterConfig {
  const dest = './tmp/uploads';

  const storage = multer.diskStorage({
    destination(request, file, cb) {
      mkdir(dest, { recursive: true }, err => {
        cb(err, dest);
      });
    },
    filename,
  });
  return {
    dest,
    storage,
  };
}
