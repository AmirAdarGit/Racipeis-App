// Consumer
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { logger } from "../app";
import AWS from "aws-sdk";


const awsConfig = {
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: "us-east-1",
};
const sqsClient = new SQSClient(awsConfig)

// Producer
export const SQSProducer = async (Data: any, queueUrl: string | undefined, queueJob: string) => {
  try {
    const command = new SendMessageCommand({
      MessageBody: JSON.stringify(Data),
      QueueUrl: queueUrl,
      MessageAttributes: {
        OrderId: {DataType: "String", StringValue: "4421x"},
      },
    })
    await sqsClient.send(command)
    logger.info(`[SQS Producer] - ${queueJob} produce successfully`);
  } catch (error) {
    logger.error(`[SQS Producer] - ${queueJob} Error sending recipe:', ${error}`)
  }
};