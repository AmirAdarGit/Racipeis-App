export interface IUser {
  userId?: string,
  name: string,
  email: string,
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
  images?: Array<string>,
  isPrivet?: boolean
};