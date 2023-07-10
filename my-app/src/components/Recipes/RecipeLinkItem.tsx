import React from "react";
import { ImageStyled, Loader, RecipeLinkItemWrapperStyled, RecipeName } from "../../style/RecipesLinkItem.styled";
import { useNavigate } from 'react-router-dom';
import { IRecipe } from "../../utils/interfaces";

interface Props {
  recipe: IRecipe
  pageToGoBackWhileClickOnRecipe: string
}

export const RecipeLinkItem: React.FC<Props> = ({recipe, pageToGoBackWhileClickOnRecipe}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/recipePage', {state: {recipe, pageToGoBack: pageToGoBackWhileClickOnRecipe}})
  };
  return (<>
      { recipe && <RecipeLinkItemWrapperStyled onClick={ handleClick }>
        { recipe.imagesByUrls ?
          <div style={ {height: "300px", width: "300px"} }>
            <ImageStyled src={ recipe.imagesByUrls[0] }></ImageStyled>
          </div> :
          <Loader/> }
          <RecipeName>
            { recipe.recipeName }
          </RecipeName>
      </RecipeLinkItemWrapperStyled> }
    </>

  )
}

export default RecipeLinkItem;
