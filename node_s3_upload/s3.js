const AWS = require("aws-sdk");

// config: { accessKeyId, secretAccessKey, region, bucket }
function createS3(config) {
    if (config == null) throw new Error("Missing S3 Client Config");
    if (config.accessKeyId == null || config.secretAccessKey == null || config.region == null)
        throw new Error("Missing S3 Client AWS Credentials");
    if (config.bucket == null) throw new Error("Missing S3 Client Bucket");

    const s3 = new AWS.S3({
        apiVersion: "2006-03-01",
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
        region: config.region
    });

    // returns: Promise<{ ETag, Location, Key, Bucket }>
    // Location is the publicly available URL
    async function upload(buffer, contentType, path) {
        return new Promise((resolve, reject) => {
            s3.upload({
                ACL: "public-read",
                Bucket: config.bucket,
                Key: path,
                Body: buffer,
                ContentType: contentType
            }, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });
    }

    return { upload };
}

module.exports = createS3;
