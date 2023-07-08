import {  IRecipe } from "../interfaces";
import { ObjectId } from 'mongodb';
import RecipeCollection, { RecipeCollectionModel } from "./models/recipe.model";
import { logger } from "../app";

export default class RecipeCollectionDBManager {


  async create(newRecipe: IRecipe): Promise<RecipeCollectionModel> {
    return await RecipeCollection.create(newRecipe);
  }

  async incrementInteractionRecipeCount(recipeId: string) {
    try {
      return await RecipeCollection.findByIdAndUpdate(
        recipeId,
        { $inc: { interactionRecipeCount: 1 } },
      );
    } catch (error) {
      // Handle the error
      console.error(error);
      throw error;
    }
  }

  async getUserRecipes(userId: string, currentPage: number, pageSize: number) {
    const query = { userId: new ObjectId(userId) };
    const skipCount = (currentPage - 1) * pageSize;

    const documents = await RecipeCollection.find(query)
      .skip(skipCount)
      .limit(pageSize);

    logger.info(documents.toString())
    return documents
  }

  async getPopularPublicRecipesByPagination(currentPage: number, pageSize: number) {
    const documents = await RecipeCollection
      .find({ isPrivate: { $ne: true } }) // Only select recipes where isPrivate is not true (false or undefined)
      .sort({ interactionRecipeCount: -1 }) // Sort in descending order by interactionRecipeCount
      .skip((currentPage - 1) * pageSize) // Skip documents based on the current page
      .limit(pageSize) // Limit the number of documents per page

    logger.info(documents.toString())
    return documents
  }
}