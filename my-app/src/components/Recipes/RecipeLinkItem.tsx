import React from "react";
import { ImageStyled, Loader, RecipeName } from "../../style/RecipesLinkItem.styled";
import { useNavigate } from 'react-router-dom';

interface Props {
  recipe: any
}

export const RecipeLinkItem: React.FC<Props> = ({recipe}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/recipePage',{ state: { recipe } })
  };
  console.log("sssss",recipe);
  return (
    <div style={ {display: "flex", width: "50%"} } onClick={handleClick}>
      {recipe.imagesByUrls ? <ImageStyled src={ recipe.imagesByUrls[0] }></ImageStyled> : <Loader/>}
      <RecipeName>{ recipe.recipeName }</RecipeName>
    </div>
  )
}

export default RecipeLinkItem;
