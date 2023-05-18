import AWS from 'aws-sdk';
import { logger } from "../app";


const awsConfig = {
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: "us-east-1",
};
AWS.config.update(awsConfig);

const sqs = new AWS.SQS();


// Delete message

export const deleteMessageById = async (queueUrl: string ,SQSMessage: any, queueJob: string) => {
  const params: AWS.SQS.DeleteMessageRequest = {
    QueueUrl: queueUrl,
    ReceiptHandle: SQSMessage.ReceiptHandle
  };

  try {
    await sqs.deleteMessage(params).promise();
    logger.info(`[SQS Delete Message] Message with ID ${SQSMessage.MessageId} deleted successfully.`);
  } catch (error) {
    logger.error(`[SQS Delete Message] - ${queueJob}, Error deleting message with ID ${SQSMessage.MessageId}: ${error}`)

  }
};