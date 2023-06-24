import axios from "axios";
import { IUserRecipes } from "../utils/interfaces";


export const getAllRecipesFromDB = async (userId: string): Promise<any> => {
  try {
    const res = await axios.get(`http://localhost:4000/recipe/getAllRecipesById?userId=${ userId }`);
    return res.data;
  } catch (e: any) {
    console.log("error", e)
  }
}


export const insertNewRecipesToDB = async (recipe: IUserRecipes) => {
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
    console.log('Error processing images', error);
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
//TODO: add try catch
