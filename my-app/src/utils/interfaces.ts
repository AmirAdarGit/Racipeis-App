export interface User {
  userAuthId?: string,
  userDBID?: string,
  name: string,
  email: string,
  photoURL: string,
  isLogIn: boolean,
};


export interface MyResponseData {
  message: string;
  data: any;
}

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

export interface LinkBoxProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}