

const initialState = {
  userRecipes: [{
    recipeName: '',
    ingredients: Array<string>,
    procedure: Array<string>,
    notes: '',
    timeToMake: String,
    servingsNumber: String,
    images: Array<string>,
    isPrivet: Boolean
  }],
  isFetchRecipes: false
};
function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'SET_ALL_THE_RECIPES_FROM_DB':
      return {
        userRecipes: action.payload,
        isFetchRecipes: true
      };
      case 'SET_RECIPE':
        const userRecipesFromState = state.userRecipes
        userRecipesFromState.push(action.payload)
      return {
        userRecipes: userRecipesFromState,
        isFetchRecipes: true
      }
      case 'REMOVE_RECIPES_FROM_STATE':
      return {
        ...initialState
      }

    default:
      return state;
  }
}

export default userReducer;