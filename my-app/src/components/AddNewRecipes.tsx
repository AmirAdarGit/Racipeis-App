import React, { useState } from "react";
import 'firebase/compat/auth';
import { RecipesInputsStyled, WrapperDialogStyled } from "../style/AddNewRecipes.styled";


export interface Recipe {
  recipeName: string;
  description: string;
  ingredients: string;
  process: string;
  images?: Array<File>; // TODO: save the image in storage of firebase.
  imagesByUrls?: string
}

interface Props {
  onSave: (recipe: Recipe) => void;
  setShowDialog: (showAddNewRecipesComponent: boolean) => void;
}
export const AddNewRecipes: React.FC<Props> = ({onSave, setShowDialog}) => {


  // const [recipeName, setName] = useState('');
  // const [ingredients, setIngredients] = useState<Array<string>>([]);
  // const [procedure, setDescription] = useState<Array<string>>([]);
  // const [notes, setNotes] = useState('');
  // const [timeToMake, setTimeToMake] = useState<number>();
  // const [servingsNumber, setServingsNumber] = useState<number>();
  const [images, setImages] = useState<File[]>([]);
  // const [isPrivet, setIsPrivet] = useState<boolean>(false);

  const [recipeName, setRecipeName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [process, setProcess] = useState('');
  let [value, setValue] = React.useState('')

  console.log("images",images)

  let handleInputChange = (e: any) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }


  const handleSave = () => {
    const recipe: Recipe = {
      recipeName,
      description,
      ingredients,
      process,
      images,
    };
    onSave(recipe);
  };


  return (
    <WrapperDialogStyled >
      <div>
        <div style={{display: "flex", justifyContent: "flex-end"}}>
        <button  onClick={() => setShowDialog(false)}>X</button>
        </div>
        <h2 style={{fontFamily: ""}}>NEW RECIPE</h2>
        <RecipesInputsStyled>
          {/*<Text mb='8px'>Value: {value}</Text>*/}
          {/*<Textarea*/}
          {/*  value={value}*/}
          {/*  onChange={handleInputChange}*/}
          {/*  placeholder='Here is a sample placeholder'*/}
          {/*  size='sm'*/}
          {/*/>*/}
        <label>
          Recipe Name:
          <input type="text" value={ recipeName } onChange={ (e) => setRecipeName(e.target.value) }/>
        </label>
        <label>
          Description:
          <textarea value={ ingredients } onChange={ (e) => setDescription(e.target.value) }/>
        </label>
        <label>
          Ingredients:
          <textarea value={ ingredients } onChange={ (e) => setIngredients(e.target.value) }/>
        </label>
        <label>
          Process:
          <textarea value={ process } onChange={ (e) => setProcess(e.target.value) }/>
        </label>
        <label>
          Add Image:
          <input type="file" multiple onChange={ (e: any) => {
            const imageFiles: File[] = Object.values(e.target.files);

            setImages(imageFiles) }
          }/>
        </label>
        </RecipesInputsStyled>
        <button onClick={ handleSave }>Done</button>
      </div>
    </WrapperDialogStyled>
  )
}

export default AddNewRecipes;
