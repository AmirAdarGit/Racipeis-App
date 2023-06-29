import React, { useState } from "react";
import { BannerImageStyled, SearchButtonStyled, SearchInputStyled } from "../../style/BannerImage.styled";
import { ReactComponent as SearchIcon } from "../../assets/searcIcon.svg"
import { AddNewRecipesComponent, Recipe } from "../Recipes/AddNewRecipes";
import Tooltip from '@mui/material/Tooltip';
import { ButtonStyled } from "../../style/BannerImage.styled";
import { WrapperNewRecipeModalStyled } from "../../style/AddNewRecipes.styled";

interface Props {
  onSave: (recipe: Recipe) => void;
}

export const Banner: React.FC<Props> = ({ onSave }) => {

  const [showAddNewRecipeDialog, setShowAddNewRecipeDialog] = useState(false);

  const handleAddRecipe = () => {
    setShowAddNewRecipeDialog(true);
  };
  return (
    <BannerImageStyled>
      <SearchButtonStyled>
        <SearchInputStyled placeholder="Search for recipe"/>
        <SearchIcon style={ {alignSelf: "center", width: "18px", margin: "4px"} }/>
        <Tooltip title="Add" arrow>
          <ButtonStyled style={ {color: "black", border: "1px solid pink"} } onClick={ handleAddRecipe }>Add New Recipe</ButtonStyled>
        </Tooltip>

        { showAddNewRecipeDialog &&
            <WrapperNewRecipeModalStyled show={showAddNewRecipeDialog}>
                <AddNewRecipesComponent onSave={ onSave } setShowAddNewRecipeDialog={ setShowAddNewRecipeDialog }/>
            </WrapperNewRecipeModalStyled>
        }

      </SearchButtonStyled>
    </BannerImageStyled>
  )
}

export default Banner;

