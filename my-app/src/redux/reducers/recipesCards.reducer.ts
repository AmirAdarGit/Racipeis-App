

const initialState = {
  userRecipes: [{
    _id: '',
    recipeName: '',
    ingredients: [],
    procedure: [],
    notes: '',
    timeToMake: 0,
    servingsNumber: 0,
    images: [],
    isPrivet: false
  }],
  isFetchRecipes: false
};
function recipesCardsReducer(state = initialState, action: any) {
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

export default recipesCardsReducer;