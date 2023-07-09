import React, { ChangeEvent, useEffect, useState } from "react";
import { BannerImageStyled, SearchButtonStyled, SearchInputStyled } from "../../style/BannerImage.styled";
import { ReactComponent as SearchIcon } from "../../assets/searcIcon.svg"
import { AddNewRecipesComponent } from "../Recipes/AddNewRecipes";
import Tooltip from '@mui/material/Tooltip';
import { ButtonStyled } from "../../style/BannerImage.styled";
import { WrapperNewRecipeModalStyled } from "../../style/AddNewRecipes.styled";
import axios from "axios";
import { IRecipe } from "../../utils/interfaces";

interface Props {
  onSave: (recipe: IRecipe) => void;
  setSearchedRecipes: (recipes: IRecipe[] | null) => void;
  setSearchQuery: (searchText: string) => void;
  searchQuery: string;
}

export const Banner: React.FC<Props> = ({onSave, setSearchedRecipes, setSearchQuery, searchQuery}) => {

  const [showAddNewRecipeDialog, setShowAddNewRecipeDialog] = useState(false);

  const handleAddRecipe = () => {
    setShowAddNewRecipeDialog(true);
  };


  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setSearchQuery(value);
    setSearchedRecipes(null)
  };


  // Perform search when the query meets the conditions
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length >= 1) {
        performSearch();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const performSearch = () => {
    axios.get(`http://localhost:4000/recipe/searchRecipe`,
      {
        params: {
          searchQuery: searchQuery
        }
      }
    )
      .then((response) => {
        // Process the search results
        console.log(response.data);
        setSearchedRecipes(response.data)
      })
      .catch((error) => {
        console.error('An error occurred while searching:', error);
      });
  };


  return (
    <BannerImageStyled>
      <SearchButtonStyled>
        <SearchInputStyled
          placeholder="Search for recipe"
          onChange={ handleSearchChange }
          type="text"
          value={ searchQuery }/>
        <SearchIcon style={ {alignSelf: "center", width: "18px", margin: "4px"} }
        />
        <Tooltip title="Add" arrow>
          <ButtonStyled style={ {color: "black", border: "1px solid pink"} } onClick={ handleAddRecipe }>Add New
            Recipe</ButtonStyled>
        </Tooltip>

        { showAddNewRecipeDialog &&
            <WrapperNewRecipeModalStyled show={ showAddNewRecipeDialog }>
                <AddNewRecipesComponent onSave={ onSave } setShowAddNewRecipeDialog={ setShowAddNewRecipeDialog }/>
            </WrapperNewRecipeModalStyled>
        }

      </SearchButtonStyled>
    </BannerImageStyled>
  )
}

export default Banner;

