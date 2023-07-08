
import AWS from 'aws-sdk';
import { SQSConsumer } from "./SQSReciveMS";
import Recipe from "../domain/Recipe";
import { deleteMessageById } from "./SQSDeleteMS";
import { IRecipe } from "../interfaces";
import { logger } from "../app";

export default class SQSMessage {
  initialize() {
    const awsConfig = {
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey,
      region: "us-east-1",
    };
    AWS.config.update(awsConfig);
    this.pollMessages();
  }
  async pollMessages() {
    while (true) {
      try {
        const messages = await SQSConsumer(process.env.recipesQueueName as string, 'Create New Recipe');
        if (messages && messages.length > 0) {
          for (const message of messages) {
            const messageId = message.MessageId;
            const recipeDomain = new Recipe();
            try {
              await recipeDomain.createRecipe(JSON.parse(message.Body as string) as IRecipe);
              await deleteMessageById(process.env.recipesQueueName as string, message, 'Create New Recipe');
            } catch (error) {
              logger.error(`Error inserting new recipe with Message ID ${messageId}: with the error: ${error}`);
            }
          }
        }
      } catch (error) {
        logger.error(`[SQSMessage] Error retrieving messages: with the error: ${error}`);
      }
    }
  }

}
