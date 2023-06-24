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
interface Props {
  userData: any;
  setUser: (user: any) => void
}

export const UserLandingPage: React.FC<Props> = ({userData, setUser}) => {

  const dispatch = useDispatch();
  const userProfile = useSelector(getUserProfile);
  const allTheRecipes = useSelector(getRecipesCards);

  const [showDialog, setShowDialog] = useState(false);

  const handleAddRecipe = () => {
    setShowDialog(!showDialog);
  };


  const handleSaveRecipe = async (recipe: Recipe) => {
    let imagesByUrls: Array<string> = []
    if (recipe.images) {
        imagesByUrls = await sendImageByImageToS3(recipe.images);
    }
    delete recipe.images;
    const recipeWithUrlImages: IUserRecipes = {...recipe, imagesByUrls: imagesByUrls, userId: userProfile.userDBID}
    try {
      await insertNewRecipesToDB(recipeWithUrlImages)
      dispatch({type: 'SET_RECIPE', payload: recipeWithUrlImages});
      setShowDialog(false)
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
      {allTheRecipes && <RecipesList recipes={allTheRecipes}/>}
      <button onClick={ handleAddRecipe }>Add Recipe</button>
      { showDialog && <AddNewRecipes onSave={ handleSaveRecipe } setShowDialog={ setShowDialog }/> }
      <SignOutComponent setUser={ setUser }/>
    </>
  )
}

export default UserLandingPage;

