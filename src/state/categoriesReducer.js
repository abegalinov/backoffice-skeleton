import { CATEGORIES_LOADING_STARTED, CATEGORIES_LOADED, CATEGORIES_LOADING_FAILED } 
    from "./categoriesActionTypes";

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
    default: return state;
  };
};

export default categoriesReducer;
