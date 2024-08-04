import { S3Client } from '@aws-sdk/client-s3';

import dotenv from 'dotenv';
dotenv.config();

const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID as string;
const awsAccessKeyPw = process.env.AWS_SECRET_ACCESS_KEY as string;
const awsRegion = process.env.AWS_REGION as string;
const bucketName = process.env.S3_BUCKET_NAME as string;

const s3 = new S3Client({
    region: awsRegion,
    credentials: {
        accessKeyId: awsAccessKeyId,
        secretAccessKey: awsAccessKeyPw
    }
});

export {
    s3,
    bucketName,
}
