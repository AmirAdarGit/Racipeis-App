
import { IUserRecipes } from "../interfaces";
import RecipeCollectionDBManager from "../db/recipeCollectionDBManager";

export default class Recipe {
  private recipeDBManager = new RecipeCollectionDBManager();


  async createRecipe(user: IUserRecipes) {
    return await this.recipeDBManager.create(user);
  }

}
