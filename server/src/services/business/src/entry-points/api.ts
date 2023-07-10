"use strict";
import express from "express";
import Users from "../domain/users";
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

      const {name, userAuthId, email, isLogIn, photoURL} = req.body;

      if (!name || !userAuthId || !email || !isLogIn) {
        throw new Error("params are missing");
      }

      const user = {
        name,
        userAuthId,
        email,
        photoURL,
        isLogIn
      }
      const userDomain = new Users();

      return await userDomain.createUser(user);
    } catch (error) {
      console.log("Error from server: ", error);
      throw new Error(`Error from server: , ${ error }`)
    }
  }

  async isUserActivate(req: express.Request, res: express.Response) {
    try {

      const {userAuthId, isLogIn} = req.body;

      if (!userAuthId || isLogIn) {
        throw new Error("params are missing");
      }
      const userDomain = new Users();

      return await userDomain.updateUserIsLogIn(userAuthId, isLogIn);
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

  async incrementInteractionRecipeCount(req: express.Request, res: express.Response) {
    try {
      const { recipeId } = req.body;

      if (!recipeId) {
        throw new Error("params are missing");
      }
      const recipeDomain = new Recipe();
      return await recipeDomain.incrementInteractionRecipeCount(recipeId);
    } catch (error) {
      console.log("Error from server: ", error);
      throw new Error(`Error from server: , ${ error }`)
    }
  }

  async getRecipes(req: express.Request, res: express.Response) {
    try {
      const { userId, currentPage, pageSize, shouldGetTotalRecipesCount } = req.query;

      //gat the most popular public recipes
      const recipeDomain = new Recipe();
      let RecipesToReturn;
      if (!userId) {
        RecipesToReturn = await recipeDomain.getPopularPublicRecipesByPagination(currentPage, pageSize, Boolean(shouldGetTotalRecipesCount));

      } else {
        RecipesToReturn = await recipeDomain.getUserRecipes(userId as string, currentPage, pageSize);
      }

      if (!RecipesToReturn) {
        return null
      }
      return RecipesToReturn;
    } catch (error) {
      console.log("Error from server: ", error);
      throw new Error(`Error from server: , ${ error }`)
    }
  }

  async searchRecipe(req: express.Request, res: express.Response) {
    try {
      const { searchQuery, isPrivate, userDBId } = req.query;
      if (!searchQuery) {
        throw new Error("params are missing");
      }
      if (isPrivate && !userDBId) {
        throw new Error("params are missing");
      }
      const recipeDomain = new Recipe();
      return await recipeDomain.searchRecipe(searchQuery, isPrivate, userDBId);
    } catch (error) {
      console.log("Error from server: ", error);
      throw new Error(`Error from server: , ${ error }`)
    }
  }

  async countUserRecipes(req: express.Request, res: express.Response) {
    try {
      const { userId } = req.query;
      if (!userId) {
        throw new Error("params are missing");
      }

      const recipeDomain = new Recipe();
      return await recipeDomain.countUserRecipes(userId);
    } catch (error) {
      console.log("Error from server: ", error);
      throw new Error(`Error from server: , ${ error }`)
    }
  }


}
