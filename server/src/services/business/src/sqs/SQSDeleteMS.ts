// Consumer
import AWS from 'aws-sdk';


const awsConfig = {
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: "us-east-1"
};
AWS.config.update(awsConfig);

const sqs = new AWS.SQS();


export const deleteMessageById = async (queueUrl: string ,receiptHandle: any) => {
  const params: AWS.SQS.DeleteMessageRequest = {
    QueueUrl: queueUrl,
    ReceiptHandle: receiptHandle.ReceiptHandle
  };

  try {
    await sqs.deleteMessage(params).promise();
    console.log(`Message with ID ${receiptHandle.MessageId} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting message with ID ${receiptHandle}:`, error);
  }
};