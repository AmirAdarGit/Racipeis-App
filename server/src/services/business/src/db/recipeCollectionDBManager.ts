import { IRecipe } from "../interfaces";
import { ObjectId } from 'mongodb';
import RecipeCollection, { RecipeCollectionModel } from "./models/recipe.model";
import { logger } from "../app";

export default class RecipeCollectionDBManager {


  async create(newRecipe: IRecipe): Promise<RecipeCollectionModel> {
    return await RecipeCollection.create(newRecipe);
  }

  async incrementInteractionRecipeCount(recipeId: string) {
      const documents = await RecipeCollection
        .findByIdAndUpdate(recipeId, {$inc: {interactionRecipeCount: 1}});
      return documents;
  }

  async getUserRecipes(userId: string, currentPage: number, pageSize: number) {
    const documents = await RecipeCollection
      .find({userId: new ObjectId(userId)})
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);

    logger.info(documents.toString())
    return documents
  }

  async getPopularPublicRecipesByPagination(currentPage: number, pageSize: number) {
    const documents = await RecipeCollection
      .find({isPrivate: false}) // Only select recipes where isPrivate is not true (false or undefined)
      .sort({interactionRecipeCount: - 1}) // Sort in descending order by interactionRecipeCount
      .skip((currentPage - 1) * pageSize) // Skip documents based on the current page
      .limit(pageSize) // Limit the number of documents per page

    logger.info(documents.toString())
    return documents
  }

  async searchRecipe(searchQuery: string) {
    const documents = await RecipeCollection.find(
      {
        recipeName: {$regex: searchQuery, $options: 'i'},
        isPrivate: false
      }
    );
    logger.info(documents.toString())
    return documents
  }
}

