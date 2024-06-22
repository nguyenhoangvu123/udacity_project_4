import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
export async function uploadUrl(todoId) {
    const bucketName = process.env.IMAGES_S3_BUCKET;
    const urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION);
    const s3Client = new S3Client();
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: todoId
    })
    const signedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: urlExpiration
    })
    return signedUrl;
}