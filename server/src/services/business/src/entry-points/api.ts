"use strict";
import express from "express";
import Users from "../domain/users";
import { IUser, IUserRecipes } from "../interfaces";
import { SQSProducer } from "../sqs/SQSSendMQ";
import Recipe from "../domain/Recipe";

export default class API_Controller {

  async getUserByAuthId(req: express.Request, res: express.Response) {
    try {
      const {userAuthId} = req.query;

      if (!userAuthId) {
        throw new Error("params are missing");
      }
      const userDomain = new Users();
      const newUser = await userDomain.getUserByAuthId(userAuthId as string);
      if (!newUser) {
        return null
      }
      return newUser;
    } catch (error) {
      console.log("Error from server: ", error);
      throw new Error(`Error from server: , ${ error }`)
    }
  }

  async createNewUser(req: express.Request, res: express.Response) {
    try {

      const {name, userAuthId, email, isLogIn} = req.body;

      if (!name || !userAuthId || !email || !isLogIn) {
        throw new Error("params are missing");
      }

      const user = {
        name,
        userAuthId,
        email,
        isLogIn
      }
      const userDomain = new Users();

      return await userDomain.createUser(user);
    } catch (error) {
      console.log("Error from server: ", error);
      throw new Error(`Error from server: , ${ error }`)
    }
  }

  async createNewRecipe(req: express.Request, res: express.Response) {
    try {
      const {
        userId,
        recipeName,
        ingredients,
        procedure,
        notes,
        timeToMake,
        servingsNumber,
        imagesByUrls,
        isPrivet
      } = req.body;

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
        imagesByUrls,
        isPrivet
      }

      // send the recipe to SQS
      // await SQSProducer(newRecipe, process.env.recipesQueueName, "Create New Recipe Queue");
      const recipeDomain = new Recipe();
      return await recipeDomain.createRecipe(newRecipe);
    } catch (error) {
      console.log("Error from server: ", error);
      throw new Error(`Error from server: , ${ error }`)
    }
  }

  async getAllRecipesById(req: express.Request, res: express.Response) {
    try {
      const { userId } = req.query;

      if (!userId) {
        throw new Error("params are missing");
      }
      const recipeDomain = new Recipe();
      const allRecipes = await recipeDomain.getAllRecipesById(userId as string);
      if (!allRecipes) {
        return null
      }
      return allRecipes;
    } catch (error) {
      console.log("Error from server: ", error);
      throw new Error(`Error from server: , ${ error }`)
    }
  }


}
