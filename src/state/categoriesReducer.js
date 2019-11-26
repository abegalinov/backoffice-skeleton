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
    case CATEGORY_DELETED: 
       return {
         ...state,
         categories: state.categories.filter(category => category.id !== action.payload)
       };
    case CATEGORY_UPDATED: 
      return {
        ...state,
        categories: state.categories.map(category => category.id === action.payload.id ? action.payload : category)
      };
    default: return state;
  };
};

export default categoriesReducer;
