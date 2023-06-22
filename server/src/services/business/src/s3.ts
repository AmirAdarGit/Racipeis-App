import aws from 'aws-sdk'
import * as fs from "fs";
import { randomBytes } from "crypto";

const awsRegion = process.env.AWS_BUCKET_REGION
const awsAccessKeyId = process.env.AWS_ACCESS_KEY
const awsSecretAccessKey = process.env.AWS_SECRET_KEY
const awsBucketName = process.env.AWS_BUCKET_NAME || ''


const s3 = new aws.S3({
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
})

// upload a file to s3

export const uploadFile = async (file: any) => {
  try {
    const fileStream = fs.createReadStream(file.path)
  const rawBytes = await randomBytes(8)
  const imageName = rawBytes.toString('hex')
    const uploadParams = {
      Bucket:  process.env.AWS_BUCKET_NAME || '',
      Body: fileStream,
      Key: file.filename + imageName
    }
    return s3.upload(uploadParams).promise()
  }catch (e) {
    console.log(e)
  }
}
export const getFileStreamFromS3 = async (fileKey: string) => {
  try {
    const downloadedParams = {
      Key: fileKey,
      Bucket:  process.env.AWS_BUCKET_NAME || ''
    }
    return await s3.getObject(downloadedParams).createReadStream()
  }catch (e) {
    console.log(e)
  }
}
