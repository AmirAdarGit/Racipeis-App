import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from "../../redux/selectors/user.selector";
import { insertNewRecipesToDB, sendImageByImageToS3 } from "../../functions/recipesDB.Queries";
import { getRecipesCards } from "../../redux/selectors/recipesCards.selector";
import { RecipesList } from "../Recipes/RecipesList";
import { IRecipe } from "../../utils/interfaces";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Banner from "./Banner";
import { WrapperCatalog } from "../../style/BannerImage.styled";

interface Props {
}

export const RecipesCatalog: React.FC<Props> = () => {

  const dispatch = useDispatch();
  const userProfile = useSelector(getUserProfile);
  const recipesCards = useSelector(getRecipesCards);

  const [allTheRecipes, setAllTheRecipes] = useState<any>(null)
  const [searchedRecipes, setSearchedRecipes] = useState<IRecipe[] | null>(null)
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    if (recipesCards) {
      setAllTheRecipes(recipesCards.userRecipes);
    }
  }, [recipesCards, searchedRecipes])

  const handleSaveRecipe = async (recipe: IRecipe) => {
    let imagesByUrls: Array<string> = []
    if (recipe.images) {
      imagesByUrls = await sendImageByImageToS3(recipe.images);
    }
    delete recipe.images;
    const recipeWithUrlImages = {...recipe, imagesByUrls: imagesByUrls, userId: userProfile.userDBID, _id: ''}

    try {
      const res = await insertNewRecipesToDB(recipeWithUrlImages)
      const newRecipeToSaveInState: IRecipe = {...recipeWithUrlImages, _id: res._id}
      // TODO: think: sould i save the time stemp also in state?
      dispatch({type: 'SET_RECIPE', payload: newRecipeToSaveInState});
      toast.success("New Recipe Created Successfully");
    } catch (e: any) {
      console.log("cannot create new recipe", e)
      toast.error("Cannot Create New Recipe Now...");
    }
  };

  return (
    <WrapperCatalog>
      <Banner onSave={ handleSaveRecipe } setSearchedRecipes={ setSearchedRecipes } searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      {searchQuery.length === 0 && allTheRecipes && <RecipesList recipes={  allTheRecipes }/>}
      {searchedRecipes && <RecipesList recipes={ searchedRecipes  }/>}
    </WrapperCatalog>
  )
}

export default RecipesCatalog;

