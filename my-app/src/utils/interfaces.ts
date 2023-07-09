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

export interface IRecipe {
  _id?: string,
  userId?: string,
  recipeName: string,
  ingredients: Array<string>,
  procedure: Array<string>,
  notes?: string,
  timeToMake?: string,
  servingsNumber?: string,
  isPrivet?: boolean
  images?: Array<File>;
  imagesByUrls?: Array<string>,
};




export interface LinkBoxProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

