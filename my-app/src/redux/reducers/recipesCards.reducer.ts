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
  isFetchRecipes: false,
  totalRecipeCount: 0,
  currentPage: 1

};

function recipesCardsReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'SET_PRIVATE_RECIPES_FROM_DB':
      return {
        ...state,
        userRecipes: action.payload.recipesFromDB,
        totalRecipeCount: action.payload.totalPrivateRecipeCount,
        isFetchRecipes: true,
      };
    case 'SET_RECIPE':
      const cloneRecipes = state.userRecipes
      cloneRecipes.push(action.payload)
      return {
        ...state,
        userRecipes: cloneRecipes,
      }
    case 'SET_RECIPES':
      const userRecipesFromState = state.userRecipes
      const newFetchedRecipes = action.payload;
      for (let recipe of newFetchedRecipes) {
        userRecipesFromState.push(recipe)
      }
      return {
        ...state,
        userRecipes: userRecipesFromState,
      }
    case 'INCREASE_TOTAL_RECIPE_COUNT':
      const currentTotalRecipeCount = state.totalRecipeCount
      return {
        ...state,
        totalRecipeCount: currentTotalRecipeCount + 1
      }
    case 'SET_TOTAL_RECIPE_COUNT':
      const totalRecipeCount = action.payload
      return {
        ...state,
        totalRecipeCount: totalRecipeCount
      }
    case 'INCREMENT_RECIPE_PAGE':
      const currentPage = action.payload
      return {
        ...state,
        currentPage: currentPage + 1
      }
    case 'REMOVE_PRIVATE_RECIPES_FROM_STATE':
      return {
        ...initialState
      }

    default:
      return state;
  }
}

export default recipesCardsReducer;