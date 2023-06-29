import React, { useState } from "react";
import 'firebase/compat/auth';
import {
  CloseButtonStyled,
  PopupContainer,
  PopupContent, RecipesInputsStyled,
  PopupLayOut,
  HeaderPopup,
  TitleStyled, UploadImageWrapperStyled
} from "../../style/AddNewRecipes.styled";
import { Divider, TextField } from "@mui/material";
import { ReactComponent as CloseIcon } from "../../assets/closeIcon.svg"
import { ReactComponent as TrashIcon } from "../../assets/trash.svg"
import { ReactComponent as UploadIcon } from "../../assets/uploadIcon.svg"
import Button from "@mui/material/Button";


export interface Recipe {
  recipeName: string;
  ingredients: Array<string>;
  procedure: Array<string>;
  notes: string;
  timeToMake: string;
  servingsNumber: string;
  isPrivet: boolean;
  images?: Array<File>;
  imagesByUrls?: Array<string>;
  userId?: string;
}

interface Props {
  onSave: (recipe: Recipe) => void;
  setShowAddNewRecipeDialog: (showAddNewRecipesComponent: boolean) => void;
}

export const AddNewRecipesComponent: React.FC<Props> = ({onSave, setShowAddNewRecipeDialog}) => {


  const [recipeName, setRecipeName] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [notes, setNotes] = useState('');
  const [timeToMake, setTimeToMake] = useState<string>('');
  const [servingsNumber, setServingsNumber] = useState<string>('');
  const [isPrivet, setIsPrivet] = useState<boolean>(false); // TODO: for social search for the V2

  const [inputValue, setInputValue] = useState<any>('');
  const [ingredients, setIngredients] = useState<any>([]);

  const [inputProcedureValue, setInputProcedureValue] = useState<any>('');
  const [procedure, setProcedure] = useState<any>([]);

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };
  const handleInputProcessChange = (event: any) => {
    setInputProcedureValue(event.target.value);
  };

  const handleAddIngredient = () => {
    if (inputValue.trim() !== '') {
      setIngredients((prevIngredients: any) => [...prevIngredients, inputValue]);
      setInputValue('');
    }
  };
  const handleAddProcess = () => {
    if (inputProcedureValue.trim() !== '') {
      setProcedure((prevProcess: any) => [...prevProcess, inputProcedureValue]);
      setInputProcedureValue('');
    }
  };

  const handleKeyPress = (event: any, name: string) => {
    switch (name) {
      case "INGREDIENTS":
        if (event.key === 'Enter') {
          handleAddIngredient();
        }
        ;
        break;
      case "PROCESS":
        if (event.key === 'Enter') {
          handleAddProcess();
        }
        break
      default:
        return null
    }


  };

  const handleSave = () => {
    const recipe: Recipe = {
      recipeName,
      ingredients,
      procedure,
      notes,
      timeToMake,
      servingsNumber,
      isPrivet,
      images,
    };
    onSave(recipe);
  };

  const isDisabled = !recipeName || ingredients.length === 0 || procedure.length === 0;


  return (
    <div>
      <PopupLayOut> {/* the gray shadow seround the  popup */}
      </PopupLayOut>
      <PopupContainer>
        <PopupContent>
          <HeaderPopup>
            <TitleStyled>
              Create New Recipe
              {/*// TODO: use constants*/ }
            </TitleStyled>
            <CloseButtonStyled onClick={ () => {
              setShowAddNewRecipeDialog(false)
            } }>
              <CloseIcon/>
            </CloseButtonStyled>
          </HeaderPopup>
          <Divider/>

          <h2 style={ {fontFamily: ""} }>NEW RECIPE</h2>
          <RecipesInputsStyled>
            <TextField
              required
              label="Recipe Name"
              style={ {width: "50%", paddingBottom: "16px"} }
              value={ recipeName }
              onChange={ (e) => setRecipeName(e.target.value) }
            />
            <div style={ {display: "flex", height: "220px"} }>
              <div style={ {display: "flex", flexDirection: "column"} }>
                <div style={ {display: "flex", alignItems: "center"} }>
                  <TextField
                    label="Enter an ingredient"
                    value={ inputValue }
                    onChange={ handleInputChange }
                    onKeyPress={ (event) => handleKeyPress(event, "INGREDIENTS") }
                  />
                  <Button style={ {height: "55px"} } variant="contained" onClick={ handleAddIngredient }>
                    Add
                  </Button>
                  <TrashIcon style={ {cursor: "pointer"} } onClick={() => setIngredients([])}/>
                </div>
                <ul style={ {paddingTop: "16px", maxHeight: "100px", overflowY: "auto"} }>
                  { ingredients.map((ingredient: any, index: number) => (
                    <li key={ index }>{ ingredient }</li>
                  )) }

                </ul>
              </div>
              <div style={ {display: "flex", flexDirection: "column"} }>
                <div style={ {display: "flex", alignItems: "center"} }>
                  <TextField
                    label="Enter Procedure Steps"
                    value={ inputProcedureValue }
                    onChange={ handleInputProcessChange }
                    onKeyPress={ (event) => handleKeyPress(event, "PROCESS") }
                  />
                  <Button style={ {height: "55px"} } variant="contained" onClick={ handleAddProcess }>
                    Add
                  </Button>
                  <TrashIcon style={ {cursor: "pointer"} } onClick={() => setProcedure([])}/>
                </div>

                <ul style={ {paddingTop: "16px", maxHeight: "100px", overflowY: "auto"} }>
                  { procedure.map((process: any, index: number) => (
                    <li key={ index }>{ process }</li>
                  )) }
                </ul>
              </div>
            </div>


            <UploadImageWrapperStyled>
              <UploadIcon />
              <div>
                Upload Image
              </div>
            </UploadImageWrapperStyled>

            <label>
              Add Image:
              <input type="file" multiple onChange={ (e: any) => {
                const imageFiles: File[] = Object.values(e.target.files);
                setImages(imageFiles)
              }
              }/>
            </label>
            <label>
              Time To Make:
              <input type="text" value={ timeToMake } onChange={ (e) => setTimeToMake(e.target.value) }/>
            </label>
            <label>
              Servings Number:
              <input type="number" value={ servingsNumber } onChange={ (e) => setServingsNumber(e.target.value) }/>
            </label>
            <label>
              Notes:
              <input type="text" value={ notes } onChange={ (e) => setNotes(e.target.value) }/>
            </label>
            <label>
              Private Recipe:
              <input type="checkbox" onChange={ (e) => setIsPrivet(!isPrivet) }/>
            </label>
          </RecipesInputsStyled>
          <button onClick={ handleSave } disabled={ isDisabled }>Done</button>
        </PopupContent>
      </PopupContainer>
    </div>

  )
}

export default AddNewRecipesComponent;
