import React, { useEffect, useState } from "react";
import SignOutComponent from "../SignOut";

import { registerUserAndGetAllRecipes } from "../../functions/registerDB.Queries";
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from "../../redux/selectors/user.selector";
import logo from '../../images/recipe-book.png';
import cover from '../../images/coctail.jpg';
import { CoverImgStyled, LogoImgStyled } from "../../style/userLandingPage.styled";
import AddNewRecipes, { Recipe } from "../Recipes/AddNewRecipes";
import { insertNewImagesToDB, insertNewRecipesToDB } from "../../functions/recipesDB.Queries";
import { uploadImageToStorage } from "../../functions/imageStorageUpload.Query";
import { getIsFetchRecipes, getRecipesCards } from "../../redux/selectors/recipesCards.selector";
import { RecipesList } from "../Recipes/RecipesList";
import { IUserRecipes } from "../../utils/interfaces";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface Props {
  userData: any;
  setUser: (user: any) => void
}

export const UserLandingPage: React.FC<Props> = ({userData, setUser}) => {

  const dispatch = useDispatch();
  const userProfile = useSelector(getUserProfile);
  const allTheRecipes = useSelector(getRecipesCards);

  const [recipes, setRecipes] = useState<Recipe[]>(allTheRecipes);
  const [showDialog, setShowDialog] = useState(false);

  const handleAddRecipe = () => {
    setShowDialog(!showDialog);
  };

useEffect(() => {
  setRecipes(allTheRecipes)
},[allTheRecipes])

  console.log("userProfile", userProfile);

  const handleSaveRecipe = async (recipe: Recipe) => {
    let imagesByUrls: Array<string> = []
    if (recipe.images) {
      imagesByUrls = await insertNewImagesToDB(recipe)
    }
    delete recipe.images;
    const recipeWithUrlImages: IUserRecipes = {...recipe, imagesByUrls: imagesByUrls, userId: userProfile.userDBID}
    try {
      await insertNewRecipesToDB(recipeWithUrlImages)
      dispatch({type: 'SET_RECIPE', payload: recipeWithUrlImages});
      setRecipes([...recipes, {...recipe, imagesByUrls: imagesByUrls}]); // get all the recipes from DB
    } catch (e: any) {
      console.log("cannot create new recipe", e)
      toast.error("Cannot Create New Recipe Now...");
    }
  };


  useEffect(() => {
    if (!userProfile.isLogIn && userData) {
      registerUserAndGetAllRecipes(userData)
        .then((returnData) => {
          dispatch({type: 'LOGIN', payload: returnData.userMetaData})
          if (returnData.hasOwnProperty('allRecipesFromDB')){
            dispatch({type: 'SET_ALL_THE_RECIPES_FROM_DB', payload: returnData.allRecipesFromDB})
          }
        })
    }
  }, [userData])


  return (<>
      {/*<LogoImgStyled  src={ logo } alt="Logo"/>*/ }
      {/*<CoverImgStyled src={ cover } alt="Logo"/>*/ }
      <div>Some title -</div>
      {recipes && <RecipesList recipes={recipes}/>}
      <button onClick={ handleAddRecipe }>Add Recipe</button>
      { showDialog && <AddNewRecipes onSave={ handleSaveRecipe } setShowDialog={ setShowDialog }/> }
      <SignOutComponent setUser={ setUser }/>
    </>
  )
}

export default UserLandingPage;

