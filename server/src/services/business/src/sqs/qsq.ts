import aws from "aws-sdk";
import { ReceiveMessageRequest } from "aws-sdk/clients/sqs";
import util from "util";
import AWS from "aws-sdk";
import { SQSConsumer } from "./SQSReciveMS";
import Recipe from "../domain/Recipe";
import { deleteMessageById } from "./SQSDeleteMS";
import { IUserRecipes } from "../interfaces";

export default class SQS {
  initialize() {
    const awsConfig = {
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey,
      region: "us-east-1"
    };
    AWS.config.update(awsConfig);
    this.pollMessages();
  }
  async pollMessages() {
    while (true) {
      try {
        const messages = await SQSConsumer(process.env.recipesQueueName as string, 'Create New Recipe');
        if (messages) {
          const messageId = messages.MessageId;
          console.log(`messages are ${messageId}`)

          const recipeDomain = new Recipe();
          const isInsertProperly = await recipeDomain.createRecipe(JSON.parse(messages.Body as string) as IUserRecipes);
          console.log("--------------")
          console.log(isInsertProperly)
          console.log("--------------")

          await deleteMessageById(process.env.recipesQueueName as string, messages)
        }
      } catch (error) {
        console.error('Error receiving messages:', error);
      }
    }
  }
}
