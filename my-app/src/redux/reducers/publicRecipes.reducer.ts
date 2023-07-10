const initialState = {
  publicRecipes: [{
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

function publicRecipesReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'SET_PUBLIC_RECIPES_FROM_DB':
      // const currentPublicRecipes = action.payload.allPublicRecipesFromDB
      let currentPublicRecipes = state.publicRecipes
      if (state.isFetchRecipes){ // the first time the user in the login page the useEffect is fetch the recipes and we dont want to add the empty state to owr recipe list
        currentPublicRecipes.push(...action.payload.allPublicRecipesFromDB)
      } else {
        currentPublicRecipes = action.payload.allPublicRecipesFromDB
      }
      return {
        ...state,
        publicRecipes: currentPublicRecipes,
        totalRecipeCount: action.payload.totalPublicRecipeCount,
        currentPage: state.currentPage + 1,
        isFetchRecipes: true,
      };
    case 'INCREASE_PUBLIC_TOTAL_RECIPE_COUNT':
      const currentTotalRecipeCount = state.totalRecipeCount
      return {
        ...state,
        totalRecipeCount: currentTotalRecipeCount + 1
      }
    case 'SET_PUBLIC_TOTAL_RECIPE_COUNT':
      const totalRecipeCount = action.payload
      return {
        ...state,
        totalRecipeCount: totalRecipeCount
      }
    case 'INCREMENT_PUBLIC_RECIPE_PAGE':
      const currentPage = action.payload
      return {
        ...state,
        currentPage: currentPage + 1
      }
    case 'REMOVE_PUBLIC_RECIPES_FROM_STATE':
      return {
        ...initialState
      }

    default:
      return state;
  }
}

export default publicRecipesReducer;