import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  GoBackButtonStyled,
  ImageContainer,
  ImageStyled, IngredientsStyled,
  KnifeForkIconStyled,
  MainContentWrapperStyled, NotesStyled, NotesTitleStyled,
  RecipeCardWrapperStyled,
  RecipeNameStyled,
  RecipeTopRightDataWrapperStyle,
  SeparatorStyled,
  ServingsAndTimeToMakeStyled
} from "../../style/RecipeCard.styled";
import { ReactComponent as KnifeForkIcon } from "../../assets/fork-and-knife-in-cross.svg";
import { ReactComponent as ClockIcon } from "../../assets/clock.svg";
import axios from "axios";


export const RecipePage: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const {state} = location;

  const {
    _id,
    recipeName,
    ingredients,
    procedure,
    notes,
    timeToMake,
    servingsNumber,
    imagesByUrls,
  } = state.recipe
  const pageToGoBackWhileClickOnRecipe = state.pageToGoBack
  const handleClick = () => {
    navigate(pageToGoBackWhileClickOnRecipe)
  };

  // increment the interaction with the current recipe for analytics (show the most view first)
  useEffect(() => {
    const fetchData = async () => {
      if (_id) {
        try {
          return await axios.post(`http://localhost:4000/recipe/incrementInteractionRecipeCount`, {recipeId: _id});
        } catch (e: any) {
          console.log("error", e)
        }
      }
    }
    fetchData()
  }, [])

  return (<>
      <RecipeCardWrapperStyled>
        <div style={ {
          display: "flex",
          height: "500px",
          backgroundColor: "rgb(239, 234, 230)",
          borderRadius: "8px 8px 0 0 "
        } }>
          <ImageContainer>
            <ImageStyled src={ imagesByUrls[0] }>

            </ImageStyled>
          </ImageContainer>
          <RecipeTopRightDataWrapperStyle>
            <RecipeNameStyled>
              { recipeName }
            </RecipeNameStyled>
            <ServingsAndTimeToMakeStyled>
              { servingsNumber && <KnifeForkIconStyled>
                  <KnifeForkIcon style={ {width: "30px", height: "30px", padding: "8px"} }/> { servingsNumber } servings
              </KnifeForkIconStyled> }
              { timeToMake && <KnifeForkIconStyled>
                  <ClockIcon style={ {width: "30px", height: "30px", padding: "8px"} }/> { timeToMake }
              </KnifeForkIconStyled> }
            </ServingsAndTimeToMakeStyled>
            <SeparatorStyled/>
            <IngredientsStyled>
              <div style={ {fontSize: '30px', padding: "24px", fontFamily: "ui-monospace"} }>INGREDIENTS</div>
              <div style={{ overflowY: "auto"}}>{ ingredients.map((line: string, index: number) => <div style={ {padding: "4px"} }
                                                                           key={ index }> { line }</div>) }</div>
            </IngredientsStyled>
          </RecipeTopRightDataWrapperStyle>
        </div>
        <MainContentWrapperStyled>
          <div style={ {display: "flex", justifyContent: "space-around"} }>

            <div style={ {display: "flex", flexDirection: "column", padding: "32px", width: "100%"} }>
              <div style={ {fontSize: '30px', padding: "0 24px 24px 24px" , fontFamily: "ui-monospace"} }>PROCEDURE</div>
              <div style={ {
                display: "flex",
                flexDirection: "column",
                alignItems: "baseline"
              } }>{ procedure.map((line: string, index: number) =>
                <div key={ index } style={ {padding: "4px", textAlign: "start"} }>
                  { index + 1 }) { line.trim() }
                </div>) }
              </div>
            </div>
          </div>

          { notes && <NotesStyled style={ {height: "auto", padding: "8px", textAlign: "start"} }>
              <NotesTitleStyled>NOTES</NotesTitleStyled> { notes }
          </NotesStyled> }
        </MainContentWrapperStyled>

      </RecipeCardWrapperStyled>

      {/*TODO: add remove icon with logic*/}
      <GoBackButtonStyled onClick={ handleClick }>Go Back</GoBackButtonStyled>
    </>
  )
}


export default RecipePage;
