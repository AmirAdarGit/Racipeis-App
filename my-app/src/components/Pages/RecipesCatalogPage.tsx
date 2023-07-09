import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from "../../redux/selectors/user.selector";
import {
  getRecipes,
  insertNewRecipesToDB,
  sendImageByImageToS3
} from "../../functions/recipesDB.Queries";
import { getRecipesCards } from "../../redux/selectors/recipesCards.selector";
import { RecipesList } from "../Recipes/RecipesList";
import { IRecipe } from "../../utils/interfaces";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Banner from "./Banner";
import { getSearchPublicRecipe } from "../../redux/selectors/searchPublicRecipes.selector";
import { ShowMoreButtonStyled, WrapperCatalog } from "../../style/RcipesCatalogPage.styled";
import Button from "@mui/material/Button";
import { PAGE_SIZE } from "../../utils/constants";

interface Props {
}

export const RecipesCatalog: React.FC<Props> = () => {

  const dispatch = useDispatch();

  const userProfile = useSelector(getUserProfile);
  const recipesCards = useSelector(getRecipesCards);
  const searchPublicRecipesCards = useSelector(getSearchPublicRecipe);
  const searchedRecipes = searchPublicRecipesCards.publicRecipes
  const searchText = searchPublicRecipesCards.searchText
  const totalRecipeCount = recipesCards.totalRecipeCount
  const currentRecipePage = recipesCards.currentPage

  const [allTheRecipes, setAllTheRecipes] = useState<any>(null)
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

  const handleShowMoreRecipesByPagination = () => {

    getRecipes(userProfile.userDBID, currentRecipePage + 1, PAGE_SIZE).then((newRecipes) => {
      console.log("currentRecipePage", currentRecipePage)
      dispatch({type: 'SET_RECIPES', payload: newRecipes.recipes});
      dispatch({type: 'INCREMENT_RECIPE_PAGE', payload: currentRecipePage});
    })
  }
  return (
    <WrapperCatalog>
      <Banner onSave={ handleSaveRecipe } searchQuery={ searchQuery } setSearchQuery={ setSearchQuery }/>
      { searchText.length === 0 && allTheRecipes && <RecipesList recipes={ allTheRecipes }/> }
      { searchText.length !== 0 && <RecipesList recipes={ searchedRecipes }/> }
      { allTheRecipes && (recipesCards.userRecipes.length < totalRecipeCount) ?
        <ShowMoreButtonStyled>
          <Button onClick={ handleShowMoreRecipesByPagination }>Show
            more
          </Button>
        </ShowMoreButtonStyled> : '' }
    </WrapperCatalog>
  )
}

export default RecipesCatalog;

