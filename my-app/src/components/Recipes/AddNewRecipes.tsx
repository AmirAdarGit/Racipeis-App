import React, { useState } from "react";
import 'firebase/compat/auth';
import { RecipesInputsStyled, WrapperDialogStyled } from "../../style/AddNewRecipes.styled";
import UnitsList from "./MultyLinesUserInput";


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
  setShowDialog: (showAddNewRecipesComponent: boolean) => void;
}

export const AddNewRecipes: React.FC<Props> = ({onSave, setShowDialog}) => {


  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState<Array<string>>([]);
  const [procedure, setProcedure] = useState<Array<string>>([]);
  const [images, setImages] = useState<File[]>([]);
  const [notes, setNotes] = useState('');
  const [timeToMake, setTimeToMake] = useState<string>('');
  const [servingsNumber, setServingsNumber] = useState<string>('');
  const [isPrivet, setIsPrivet] = useState<boolean>(false); // TODO: for social search for the V2

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


  return (
    <WrapperDialogStyled>
      <div>
        <div style={ {display: "flex", justifyContent: "flex-end"} }>
          <button onClick={ () => setShowDialog(false) }>X</button>
        </div>
        <h2 style={ {fontFamily: ""} }>NEW RECIPE</h2>
        <RecipesInputsStyled>
          <label>
            Recipe Name:
            <input type="text" value={ recipeName } onChange={ (e) => setRecipeName(e.target.value) }/>
          </label>
          <label>
            Ingredients:
            <UnitsList unitTitle={ "Ingredients" } setTextFields={ setIngredients } textFields={ ingredients }/>
          </label>
          <label>
            Procedure:
            <UnitsList unitTitle={ "Procedure" } setTextFields={ setProcedure } textFields={ procedure }/>
          </label>
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
            <input type="checkbox"  onChange={ (e) => setIsPrivet(!isPrivet) }/>
          </label>
        </RecipesInputsStyled>
        <button onClick={ handleSave }>Done</button>
      </div>
    </WrapperDialogStyled>
  )
}

export default AddNewRecipes;
