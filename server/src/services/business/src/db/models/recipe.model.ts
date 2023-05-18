import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const recipeSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true
  },
  recipeName: {
    type: String,
    required: true
  },
  ingredients: {
    type: Array<String>,
    required: true
  },
  procedure: {
    type: Array<String>,
    required: true
  },
  notes: {
    type: String,
    required: false
  },
  timeToMake: {
    type: String,
    required: false
  },
  servingsNumber: {
    type: String,
    required: false
  },
  images: {
    type: Array<String>,
    required: false
  },
  isPrivet: {
    type: Boolean,
    required: false
  },
});


export interface RecipeCollectionModel extends mongoose.Document {
  userId: ObjectId,
  recipeName: string,
  ingredients: Array<string>,
  procedure: Array<string>,
  notes: string,
  timeToMake: string,
  servingsNumber: string,
  images: Array<string>,
  isPrivet: boolean
}



const RecipeCollection = mongoose.model<RecipeCollectionModel>('Recipe', recipeSchema);

export default RecipeCollection;
