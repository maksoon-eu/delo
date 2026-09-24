import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { env } from '@/config/env';

type UploadToS3Input = {
  key: string;
  body: Buffer;
  contentType: string;
};

const s3Client = new S3Client({
  region: env.S3_REGION,
  endpoint: env.S3_ENDPOINT,
  forcePathStyle: env.S3_FORCE_PATH_STYLE,
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  },
});

export async function uploadToS3(input: UploadToS3Input) {
  const { key, body, contentType } = input;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: env.S3_BUCKET,
      Key: `${env.APP_ENV}/${key}`,
      Body: body,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000, immutable',
    })
  );
}

export async function getS3Object(key: string) {
  return s3Client.send(
    new GetObjectCommand({
      Bucket: env.S3_BUCKET,
      Key: `${env.APP_ENV}/${key}`,
    })
  );
}

export async function deleteS3ObjectByKey(key: string | null) {
  if (!key) return;

  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: env.S3_BUCKET,
      Key: `${env.APP_ENV}/${key}`,
    })
  );
}
