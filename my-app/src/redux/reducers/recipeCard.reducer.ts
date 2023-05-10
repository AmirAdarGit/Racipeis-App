

const initialState = {
  recipeName: '',
  ingredients: Array<string>,
  procedure: Array<string>,
  notes: '',
  timeToMake: Number, // TODO: think how to get from the user and set as state
  servingsNumber: Number,
  images: Array<string>,
  isPrivet: Boolean
};
function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'SET_ALL_RECIPES':
      const recipes = action.payload;
      console.log(recipes)
      return {
        ...state,
        name: action.payload.displayName,
        email: action.payload.email,
        isLogIn: true,
        RecipesDBCollectionId: action.payload.RecipesDBCollectionId,
        userDBCollectionId:  action.payload.userDBCollectionId
      };
    case 'LOGOUT':
      return {
        ...state,
        name: '',
        email: '',
        isLogIn: false,
        RecipesDBCollectionId: '',
        userDBCollectionId:  ''
      };
    default:
      return state;
  }
}

export default userReducer;