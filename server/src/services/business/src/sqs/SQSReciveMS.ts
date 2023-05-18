import AWS, { SQS } from 'aws-sdk';

const awsConfig = {
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: "us-east-1"
};
AWS.config.update(awsConfig);

export const sqs = new SQS();


// Function to receive and process messages from the SQS queue
export const SQSConsumer = async (queueUrl: string, queueJob: string) => {
  const params: SQS.ReceiveMessageRequest = {
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 1,
    WaitTimeSeconds: 20,
  };

  try {
    const data: SQS.ReceiveMessageResult = await sqs.receiveMessage(params).promise();

    if (data.Messages && data.Messages.length > 0 && data.Messages[0]) {
      const message = data.Messages[0];
      console.log(message)
      if (message.Body) {
        console.log(`[SQS - ${queueJob}] pull successfully`);
        return message;
      }
    }
  } catch (error) {
    console.error('Error receiving messages:', error);
  }
};

