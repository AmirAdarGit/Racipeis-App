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
  searchText: '',
};

function searchPublicRecipeReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'SET_SEARCH_PUBLIC_RECIPES':
      return {
        ...state,
        publicRecipes: action.payload.searchRecipe,
        searchText: action.payload.searchText,
      };
    case 'SET_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.payload.searchText,
      };
    case 'REMOVE_SEARCH_PUBLIC_RECIPES':
      return {
        ...initialState
      }

    default:
      return state;
  }
}

export default searchPublicRecipeReducer;