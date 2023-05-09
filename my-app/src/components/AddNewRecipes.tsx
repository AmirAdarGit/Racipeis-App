import React, { useState } from "react";
import 'firebase/compat/auth';
import { RecipesInputsStyled, WrapperDialogStyled } from "../style/AddNewRecipes.styled";


export interface Recipe {
  name: string;
  description: string;
  ingredients: string;
  process: string;
  image?: File; // TODO: save the image in storage of firebase.
  imageUrl?: string
}

interface Props {
  onSave: (recipe: Recipe) => void;
}
export const AddNewRecipes: React.FC<Props> = ({onSave}) => {


  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [process, setProcess] = useState('');
  const [image, setImage] = useState<File | undefined>(undefined);

  const handleSave = () => {
    const recipe: Recipe = {
      name,
      description,
      ingredients,
      process,
      image,
    };
    onSave(recipe);
  };


  return (
    <WrapperDialogStyled >
      <div className="dialog">
        <h2>Add Recipe</h2>
        <RecipesInputsStyled>
        <label>
          Recipe Name:
          <input type="text" value={ name } onChange={ (e) => setName(e.target.value) }/>
        </label>
        <label>
          Description:
          <textarea value={ description } onChange={ (e) => setDescription(e.target.value) }/>
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
          <input type="file" onChange={ (e: any) => setImage(e.target.files[0]) }/>
        </label>
        </RecipesInputsStyled>
        <button onClick={ handleSave }>Done</button>
      </div>
    </WrapperDialogStyled>
  )
}

export default AddNewRecipes;
