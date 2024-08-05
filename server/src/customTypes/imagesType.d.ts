export interface Image {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    size: number,
    bucket: string,
    key: string,
    acl: string,
    contentType: string,
    contentDisposition: null,
    contentEncoding: null,
    storageClass: string,
    serverSideEncryption: null,
    metadata: { fieldName: string },
    location: string,
    etag: string,
    versionId: undefined
}
