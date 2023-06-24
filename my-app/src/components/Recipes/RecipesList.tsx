import React from "react";
import RecipeLinkItem from "./RecipeLinkItem";

interface Props {
  recipes: any
}

export const RecipesList: React.FC<Props> = ({recipes}) => {

  return (
    <div style={ {display: "flex", flexWrap: "wrap"} }>
      { recipes && recipes.map((recipe: any, index: number) => {

        return (
            <RecipeLinkItem key={ index } recipe={ recipe } />
          )
      })
      }
    </div>
  )
}

export default RecipesList;
