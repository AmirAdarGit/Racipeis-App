import axios from "axios";
import { IRecipe } from "../utils/interfaces";
import { PAGE_SIZE } from "../utils/constants";


export const getRecipes = async (userId: string, currentPage: number = 1, pageSize = PAGE_SIZE): Promise<any> => {
  try {
    //TODO: change the paganetion logic!
    const res = await axios.get(`http://localhost:4000/recipe/getRecipes?userId=${ userId }&currentPage=${ currentPage }&pageSize=${ pageSize }`);
    return res.data;
  } catch (e: any) {
    console.log("error", e)
  }
}


export const insertNewRecipesToDB = async (recipe: IRecipe) => {
  if (recipe) {
    try {
      const res = await axios.post(`http://localhost:4000/recipe/createNewRecipe`, {...recipe});
      return res.data;
    } catch (e: any) {
      console.log("error", e)
    }
  }
}


export const sendImageByImageToS3 = async (images: File[]) => {
  if (!images) return [];
  const imagePromises = images.map((image) => insertNewImagesToDB(image));
  try {
    return await Promise.all(imagePromises);
  } catch (error) {
    console.log('Error processing assets', error);
    return [];
  }
};

export const insertNewImagesToDB = async (image: File) => {
  try {
    const formData = new FormData();
    formData.append("image", image);
    const res = await axios.post(`http://localhost:4000/uploadImage`, formData, {headers: {'Content-Type': 'multipart/form-data'}});
    return res.data.imagePath
  } catch (e) {
    console.log("Error from server...", e);
  }
}

export const getTotalNumberOfRecipesForPagination = async (userId: string) => {
  if (userId) {
    try {
      const res = await axios.get(`http://localhost:4000/recipe/countUserRecipes`, {
        params: {
          userId
        }
      });
      return res.data;
    } catch (e: any) {
      console.log("error", e)
    }
  }
}