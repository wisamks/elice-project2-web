import multer from 'multer';
import multerS3 from 'multer-s3';

import { s3, bucketName } from '@_config/s3-config';

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucketName,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, `${Date.now()}_${file.originalname}`);
        },
        acl: 'public-read',
    }),
});

export default upload;
