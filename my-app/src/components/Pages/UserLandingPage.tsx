import React, { useEffect, useState } from "react";
import SignOutComponent from "../SignOut";

import { registerUser } from "../../functions/registerDB.Queries";
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

  const handleSaveRecipe = async (recipe: Recipe) => {
    let imagesByUrls: Array<string> = []
    if (recipe.images) {
      imagesByUrls = await insertNewImagesToDB(recipe)
      console.log(imagesByUrls)
    }
    delete recipe.images;
    const recipeWithUrlImages = {...recipe, imagesByUrls: imagesByUrls, userId: userProfile.userDBCollectionId}
    await insertNewRecipesToDB(recipeWithUrlImages)
    dispatch({type: 'SET_RECIPE', payload: recipeWithUrlImages});

    setRecipes([...recipes, {...recipe, imagesByUrls: imagesByUrls}]); // get all the recipes from DB
    setShowDialog(false);
  };


  useEffect(() => {
    if (!userProfile.isLogIn && userData) {
      registerUser(userData)
        .then((userMetaData) => {
          dispatch({type: 'LOGIN', payload: userMetaData})
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

