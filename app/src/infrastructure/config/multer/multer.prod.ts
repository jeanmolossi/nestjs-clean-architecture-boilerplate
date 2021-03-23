import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
import { EnvironmentService } from '../environment/environment.service';
import { filename, IMulterConfig } from './multer.config';

export function makeMulterS3Storage(
  environmentService: EnvironmentService,
): IMulterConfig {
  const s3 = new aws.S3({
    region: environmentService.get('AWS_REGION'),
    credentials: {
      accessKeyId: environmentService.get('AWS_KEY_ID'),
      secretAccessKey: environmentService.get('AWS_SECRET_KEY'),
    },
    s3ForcePathStyle: true,
  });

  const storage = multerS3({
    s3,
    bucket: environmentService.get('AWS_S3_BUCKET'),
    acl: 'public-read-write',
    cacheControl: 'max-age=31536000',
    contentDisposition: 'attachment',
    key: filename,
  });

  return {
    dest: 'prod/',
    storage,
  };
}
