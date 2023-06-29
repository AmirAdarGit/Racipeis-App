export interface IUser {
  userAuthId?: string,
  name: string,
  email: string,
  photoURL?: string,
  isLogIn: boolean,
};

export interface IUserRecipes {
  userId: string,
  recipeName: string,
  ingredients: Array<string>,
  procedure: Array<string>,
  notes?: string,
  timeToMake?: string,
  servingsNumber?: string,
  imagesByUrls?: Array<string>,
  isPrivet?: boolean
};