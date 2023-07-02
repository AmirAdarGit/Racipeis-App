import React, { useEffect, useState } from "react";
import SignOutComponent from "../SignOut";
import { registerUserAndGetAllRecipes } from "../../functions/registerDB.Queries";
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from "../../redux/selectors/user.selector";
import AddNewRecipes, { Recipe } from "../Recipes/AddNewRecipes";
import { insertNewRecipesToDB, sendImageByImageToS3 } from "../../functions/recipesDB.Queries";
import { getRecipesCards } from "../../redux/selectors/recipesCards.selector";
import { RecipesList } from "../Recipes/RecipesList";
import { IUserRecipes } from "../../utils/interfaces";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Banner from "./Banner";
import { WrapperCatalog } from "../../style/BannerImage.styled";

interface Props {
  userData: any;
  setUser: (user: any) => void
}

export const RecipesCatalog: React.FC<Props> = ({userData, setUser}) => {

  const dispatch = useDispatch();
  const userProfile = useSelector(getUserProfile);
  const recipesCards = useSelector(getRecipesCards);
  const allTheRecipes = recipesCards.userRecipes;

  const handleSaveRecipe = async (recipe: Recipe) => {
    let imagesByUrls: Array<string> = []
    if (recipe.images) {
      imagesByUrls = await sendImageByImageToS3(recipe.images);
    }
    delete recipe.images;
    const recipeWithUrlImages: IUserRecipes = {...recipe, imagesByUrls: imagesByUrls, userId: userProfile.userDBID}

    try {
      await insertNewRecipesToDB(recipeWithUrlImages)
      // TODO: think: sould i save the time stemp also in state?
      dispatch({type: 'SET_RECIPE', payload: recipeWithUrlImages});
      toast.success("New Recipe Created Successfully");
    } catch (e: any) {
      console.log("cannot create new recipe", e)
      toast.error("Cannot Create New Recipe Now...");
    }
  };


  useEffect(() => {
    if (!userProfile.isLogIn && userData) {
      registerUserAndGetAllRecipes(userData)
        .then((returnData) => {
          if (returnData.isNewUser) {
            dispatch({type: 'SIGNUP', payload: returnData.userMetaData})
          } else {
            dispatch({type: 'LOGIN', payload: returnData.userMetaData})
            dispatch({type: 'SET_ALL_THE_RECIPES_FROM_DB', payload: returnData.allRecipesFromDB})

          }
          //   dispatch({type: 'LOGIN', payload: returnData.userMetaData})
          //   if (returnData.hasOwnProperty('allRecipesFromDB')){
          //     dispatch({type: 'SET_ALL_THE_RECIPES_FROM_DB', payload: returnData.allRecipesFromDB})
        })
    }
  }, [userData])


  return (
    <WrapperCatalog>
      <Banner onSave={ handleSaveRecipe }/>
      { allTheRecipes && <RecipesList recipes={ allTheRecipes }/> }
      <SignOutComponent setUser={ setUser }/>
    </WrapperCatalog>
  )
}

export default RecipesCatalog;

