import React from "react";
import RecipeLinkItem from "./RecipeLinkItem";
import { RecipesListWrapperStyled } from "../../style/RecipesLinkItem.styled";
import { IRecipe } from "../../utils/interfaces";

interface Props {
  recipes: IRecipe[]
  pageToGoBackWhileClickOnRecipe: string
}

export const RecipesList: React.FC<Props> = ({recipes, pageToGoBackWhileClickOnRecipe}) => {
  return (
    <RecipesListWrapperStyled>
      { recipes && recipes.map((recipe: any, index: number) => {
        return (
            <RecipeLinkItem key={ index } recipe={ recipe } pageToGoBackWhileClickOnRecipe={pageToGoBackWhileClickOnRecipe}/>
          )
      })}
    </RecipesListWrapperStyled>
  )
}

export default RecipesList;
