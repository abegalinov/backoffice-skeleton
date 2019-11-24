import { 
  CATEGORIES_LOADED, 
  CATEGORIES_LOADING_FAILED, 
  CATEGORIES_LOADING_STARTED,
  CATEGORY_UPDATED,
  CATEGORY_DELETED
} from "./categoriesActionTypes";

const initialState = {loading: false, error: null, categories: []};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES_LOADING_STARTED: 
      return {
        ...state,
        loading: true
      };
    case CATEGORIES_LOADED: 
      return {
        ...state,
        loading: false,
        error: null,
        categories: [ ...action.payload ]
      };
    case CATEGORIES_LOADING_FAILED: 
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CATEGORY_UPDATED: 
     let stateCategories = state.categories.map(category => {
          if (category.id === action.payload.id) {
            return action.payload;
          }
          return category;
      });
      return {
        ...state,
        categories: stateCategories
      };
     default: return state;
  };
};

export default categoriesReducer;
