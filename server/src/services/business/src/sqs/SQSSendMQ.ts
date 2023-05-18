// Consumer
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";


const awsConfig = {
  regin: "us-east-1",
  credential: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  }
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

    const result = await sqsClient.send(command)
    console.log(result)

    console.log(`[SQS - ${queueJob}] produce successfully`);
  } catch (error) {
    console.error(`[SQS - ${queueJob}] Error sending recipe:', error`);
  }
};