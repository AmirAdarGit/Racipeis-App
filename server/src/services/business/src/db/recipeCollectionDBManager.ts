import UserCollection, { UserCollectionModel } from "./models/user.model";
import { IUser, IUserRecipes } from "../interfaces";
import { Types } from "mongoose";
import { ObjectId } from 'mongodb';
import RecipeCollection, { RecipeCollectionModel } from "./models/recipe.model";

export default class RecipeCollectionDBManager {


  async create(newRecipe: IUserRecipes): Promise<RecipeCollectionModel> {
    return await RecipeCollection.create(newRecipe);
  }
}