
import { IRecipe } from "../interfaces";
import RecipeCollectionDBManager from "../db/recipeCollectionDBManager";

export default class Recipe {
  private recipeDBManager = new RecipeCollectionDBManager();


  async createRecipe(recipe: IRecipe) {
    return await this.recipeDBManager.create(recipe);
  }
  async incrementInteractionRecipeCount(recipeId: string) {
    return await this.recipeDBManager.incrementInteractionRecipeCount(recipeId);
  }

  async getUserRecipes(userId: string, currentPage: any, pageSize: any) {
    return await this.recipeDBManager.getUserRecipes(userId, currentPage, pageSize);
  }

  async getPopularPublicRecipesByPagination(currentPage: any, pageSize: any, shouldGetTotalRecipesCount?: boolean) {
    return await this.recipeDBManager.getPopularPublicRecipesByPagination(currentPage, pageSize, shouldGetTotalRecipesCount);
  }
  async searchRecipe(searchQuery: any, isPrivate?: any, userDBId?: any) {
    return await this.recipeDBManager.searchRecipe(searchQuery, isPrivate, userDBId);
  }
  async countUserRecipes(userId: any) {
    return await this.recipeDBManager.countUserRecipes(userId);
  }

}
