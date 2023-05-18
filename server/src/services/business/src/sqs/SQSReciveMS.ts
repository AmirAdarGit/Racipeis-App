import AWS, { SQS } from 'aws-sdk';
import { logger } from "../app";

const awsConfig = {
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: "us-east-1",
};
AWS.config.update(awsConfig);

export const sqs = new SQS();



// Consumer

export const SQSConsumer = async (queueUrl: string, queueJob: string) => {
  const params: SQS.ReceiveMessageRequest = {
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 1,
    WaitTimeSeconds: 20,
  };

  try {
    const data: SQS.ReceiveMessageResult = await sqs.receiveMessage(params).promise();
    if (data.Messages && data.Messages.length > 0 && data.Messages[0]) {
      logger.info(`[SQS Consumer] - get message from the queue for the queueJob: ${queueJob}`)
      const message: SQS.Message[] = data.Messages;
      return message;
    }
  } catch (error) {
    logger.error(`[SQS Consumer]- ${queueJob} Error sending recipe:', ${error}`)
  }
};

