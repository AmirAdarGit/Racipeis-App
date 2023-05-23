import {  IUserRecipes } from "../interfaces";
import { ObjectId } from 'mongodb';
import RecipeCollection, { RecipeCollectionModel } from "./models/recipe.model";
import { logger } from "../app";
import { Collection } from 'mongodb';

export default class RecipeCollectionDBManager {


  async create(newRecipe: IUserRecipes): Promise<RecipeCollectionModel> {
    return await RecipeCollection.create(newRecipe);
  }

  async getAll(userId: string) {
    const query = {userId: new ObjectId(userId)}
    const documents = await RecipeCollection.find(query);
    logger.info(documents.toString())
    return documents
  }
}