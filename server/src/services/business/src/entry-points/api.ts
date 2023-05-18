"use strict";
import express from "express";
import Users from "../domain/users";
import { IUser, IUserRecipes } from "../interfaces";
import { SQSProducer } from "../sqs/SQSSendMQ";
import Recipe from "../domain/Recipe";

export const USER_PATH = "/user";
export default class API_Controller {

  async getUserById(req: express.Request, res: express.Response) {
    try {
      const { userId } = req.query;

      if (!userId) {
        throw new Error("params are missing");
      }
      const userDomain = new Users();
      const newUser = await userDomain.getUserById(userId as string);
      if (!newUser) {
        return "user not found"
      } else {
        return newUser;
      }
    } catch (error) {
      console.log("Error from server: ", error);
      throw new Error(`Error from server: , ${error}`)
    }
  }

  async createNewUser(req: express.Request, res: express.Response) {
    try {

      const { name, email, isLogIn } = req.body;

      if (!name || !email || !isLogIn) {
        throw new Error("params are missing");
      }

      const user = {
        name,
        email,
        isLogIn
      }
      const userDomain = new Users();

      return await userDomain.createUser(user);
    } catch (error) {
      console.log("Error from server: ", error);
      throw new Error(`Error from server: , ${error}`)    }
  }

  async createNewRecipe(req: express.Request, res: express.Response) {
    try {

      const { userId, recipeName, ingredients, procedure, notes, timeToMake, servingsNumber, images, isPrivet } = req.body;

      if (!userId || !recipeName || !ingredients || !procedure) {
        throw new Error("params are missing");
      }

      const newRecipe = {
        userId,
        recipeName,
        ingredients,
        procedure,
        notes,
        timeToMake,
        servingsNumber,
        images,
        isPrivet
      }

      // send the recipe to SQS
      await SQSProducer(newRecipe, process.env.recipesQueueName, "Create New Recipe Queue");
      // const recipeDomain = new Recipe();
      // return await recipeDomain.createRecipe(newRecipe);
      return "OK";
    } catch (error) {
      console.log("Error from server: ", error);
      throw new Error(`Error from server: , ${error}`)    }
  }

}
