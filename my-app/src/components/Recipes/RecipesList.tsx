import React from "react";
import RecipeLinkItem from "./RecipeLinkItem";
import { RecipesListWrapperStyled } from "../../style/RecipesLinkItem.styled";
import { IRecipe } from "../../utils/interfaces";

interface Props {
  recipes: IRecipe[]
}

export const RecipesList: React.FC<Props> = ({recipes}) => {
  return (
    <RecipesListWrapperStyled>
      { recipes && recipes.map((recipe: any, index: number) => {
        return (
            <RecipeLinkItem key={ index } recipe={ recipe } />
          )
      })}
    </RecipesListWrapperStyled>
  )
}

export default RecipesList;
