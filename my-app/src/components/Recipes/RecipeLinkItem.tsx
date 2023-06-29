import React from "react";
import { ImageStyled, Loader, RecipeLinkItemWrapperStyled, RecipeName } from "../../style/RecipesLinkItem.styled";
import { useNavigate } from 'react-router-dom';

interface Props {
  recipe: any
}

export const RecipeLinkItem: React.FC<Props> = ({recipe}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/recipePage',{ state: { recipe } })
  };
  return (
    <RecipeLinkItemWrapperStyled onClick={handleClick}>
      {recipe.imagesByUrls ? <ImageStyled src={ recipe.imagesByUrls[0] }></ImageStyled> : <Loader/>}
      <RecipeName>
        { recipe.recipeName }
      </RecipeName>
    </RecipeLinkItemWrapperStyled>
  )
}

export default RecipeLinkItem;
