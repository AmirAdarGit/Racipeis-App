import { ApiAction } from "./api.action";
import { BaseAction } from '../../types/base.redux.types';


const label = '[Recipe]';
export const INCREMENT_INTERACTION_RECIPE_BY_ID = `[${label}] Increment interaction recipe`;


// export const SET_POST_BY_ID = `[${label}] Set post by id`;

export interface UpdatedRecipe
{
  _id: string
  userId: string,
  recipeName: string,
  ingredients: Array<string>,
  "procedure": Array<string>,
  notes: string,
  timeToMake: string,
  servingsNumber: string,
  imagesByUrls: Array<string>,
  isPrivet: false,
  interactionRecipeCount: number,
  createdAt: string;
  updatedAt: string;
  __v: number
}

export interface RecipePayload {
  data: any;
}


// export const setSocialPostById = createAction<RecipePayload>(SET_POST_BY_ID);


export const incrementInteractionRecipe = (recipeId: string): ApiAction<UpdatedRecipe> => ({
  type: INCREMENT_INTERACTION_RECIPE_BY_ID,
  meta: {
    api: true,
  },
  payload: {
    networkLabel: INCREMENT_INTERACTION_RECIPE_BY_ID,
    method: 'post',
    path: `/recipe/incrementInteractionRecipeCount`,
    data: {
      recipeId
    },
    // baseUrl: 'localhost:4000',;
    onSuccess: [
      (data): any =>
      {
        console.log(data)
      }
  ,
    ],
  },
});