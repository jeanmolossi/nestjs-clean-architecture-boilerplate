import multer from 'multer';

export interface IMulterConfig {
  dest?: string;
  storage: multer.StorageEngine;
}

export function filename(
  request: Express.Request,
  file: Express.MulterS3.File,
  cb: (err: Error | null, filename: string) => void,
): void {
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

  const format = file.originalname.split('.');

  const name = 'auto-nammed';

  const fileName = `${`${name}-${uniqueSuffix}`}.${format[format.length - 1]}`;

  cb(null, fileName);
}
