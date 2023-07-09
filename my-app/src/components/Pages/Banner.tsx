import React, { ChangeEvent, useEffect, useState } from "react";
import {
  BannerImageStyled,
  RadioBtnFormWrapperStyled,
  SearchButtonStyled, SearchInputAndIconStyled,
  SearchInputStyled, SingleRadioBtnWrapperStyled
} from "../../style/BannerImage.styled";
import { ReactComponent as SearchIcon } from "../../assets/searcIcon.svg"
import { AddNewRecipesComponent } from "../Recipes/AddNewRecipes";
import { ButtonStyled } from "../../style/BannerImage.styled";
import { WrapperNewRecipeModalStyled } from "../../style/AddNewRecipes.styled";
import axios from "axios";
import { IRecipe } from "../../utils/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { getSearchPublicRecipe } from "../../redux/selectors/searchPublicRecipes.selector";
import { getUserProfile } from "../../redux/selectors/user.selector";
import { Radio } from "@mui/material";

interface Props {
  onSave: (recipe: IRecipe) => void;
  setSearchQuery: (searchText: string) => void;
  searchQuery: string;
}

export const Banner: React.FC<Props> = ({onSave, setSearchQuery, searchQuery}) => {
  const dispatch = useDispatch();

  const [showAddNewRecipeDialog, setShowAddNewRecipeDialog] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  const searchPublicRecipesCards = useSelector(getSearchPublicRecipe);
  const userProfile = useSelector(getUserProfile);
  const searchText = searchPublicRecipesCards.searchText

  const handleAddRecipe = () => {
    setShowAddNewRecipeDialog(true);
  };


  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setSearchQuery(value);
    dispatch({type: 'SET_SEARCH_TEXT', payload: {searchText: value}})
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
          searchQuery: searchQuery,
          isPrivate: isChecked,
          userDBId: userProfile.userDBID
        }
      }
    )
      .then((response) => {
        // Process the search results
        console.log(response.data);
        dispatch({
          type: 'SET_SEARCH_PUBLIC_RECIPES',
          payload: {searchRecipe: response.data, searchText: searchQuery}
        })

      })
      .catch((error) => {
        console.error('An error occurred while searching:', error);
      });
  };

  return (
    <BannerImageStyled>
      <SearchButtonStyled>
        <SearchInputAndIconStyled>
          <SearchInputStyled
            placeholder="Search for recipe"
            onChange={ handleSearchChange }
            type="text"
            value={ searchQuery || searchText }/>
          <SearchIcon style={ {alignSelf: "center", width: "18px", margin: "4px"} }
          />
        </SearchInputAndIconStyled>
        <RadioBtnFormWrapperStyled>
          <SingleRadioBtnWrapperStyled>
            My Recipes
            <Radio
              checked={ isChecked }
              onChange={ () => {
                setIsChecked(true)
                dispatch({type: 'SET_SEARCH_TEXT', payload: {searchText: ''}})
                setSearchQuery('')
              } }
              value={ isChecked }
              name="radio-buttons"
              inputProps={ {'aria-label': 'A'} }
            />
          </SingleRadioBtnWrapperStyled>
          <SingleRadioBtnWrapperStyled>
            Public Recipes
            <Radio
              checked={ !isChecked }
              onChange={ () => {
                setIsChecked(false)
                dispatch({type: 'SET_SEARCH_TEXT', payload: {searchText: ''}})
                setSearchQuery('')
              } }
              value={ isChecked }
              name="radio-buttons"
              inputProps={ {'aria-label': 'B'} }
            />
          </SingleRadioBtnWrapperStyled>
        </RadioBtnFormWrapperStyled>
        <ButtonStyled onClick={ handleAddRecipe }>
          Add New Recipe
        </ButtonStyled>

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

