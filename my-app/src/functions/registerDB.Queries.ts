
import axios from "axios";
import { getAllRecipesFromDB } from "./recipesDB.Queries";

export const registerUserAndGetAllRecipes = async (userData: any) => {
  let userMetaData = await getUserDataFromDBIfExist(userData);
  if (userMetaData === null) {
    const createdUser = await setNewUserToDB({
      name: userData.displayName,
      userAuthId: userData.uid,
      email: userData.email,
      isLogIn: true
    })
    return { userMetaData: createdUser };
  }
  // Get all the recipes from the db.
  const allRecipesFromDB = await getAllRecipesFromDB(userMetaData._id)
  return { userMetaData: userMetaData, allRecipesFromDB: allRecipesFromDB }
}

export const setNewUserToDB = async (userData: any): Promise<any> => {
  try {
    return await axios.post(`http://localhost:4000/user/create`,{...userData});
  } catch (e: any) {
    console.log("error", e)
  }
}

export const getUserDataFromDBIfExist = async (userAuthData: any): Promise<any> => {
  try {
    const res = await axios.get(`http://localhost:4000/user/getUserByAuthId?userAuthId=${ userAuthData.uid }`); //TODO: add also users without google authe
    return res.data;
  } catch (e: any) {
    console.log("error", e)
  }
}



