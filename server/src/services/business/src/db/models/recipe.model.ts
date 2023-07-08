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
    type: [String],
    required: true
  },
  procedure: {
    type: [String],
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
  imagesByUrls: {
    type: [String],
    required: false
  },
  isPrivate: {
    type: Boolean,
    required: false
  },
  interactionRecipeCount: {
    type: Number,
    default: 0
  }
},{timestamps: true});


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
