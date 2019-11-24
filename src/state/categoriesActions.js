import { CATEGORIES_SERVICE } from "../services/servicesKeys";
import { 
  CATEGORIES_LOADED, 
  CATEGORIES_LOADING_FAILED, 
  CATEGORIES_LOADING_STARTED,
  CATEGORY_UPDATE_STARTED,
  CATEGORY_UPDATED,
  CATEGORY_ADD_STARTED,
  CATEGORY_ADDED,
  CATEGORY_DELETE_STARTED,
  CATEGORY_DELETED
} from "./categoriesActionTypes";

export const loadCategories = () => {
  return (dispatch, getState, serviceRegistry) => {
    dispatch(categoriesLoadingStarted());
    return serviceRegistry.getService(CATEGORIES_SERVICE).getCategories().then(
      (categoriesData) => dispatch(categoriesLoaded(categoriesData)),
      (error) => dispatch(categoriesLoadingError(error))
    );
  };
};

export const editCategory = (newData) => {
  return (dispatch, getState, serviceRegistry) => {
    dispatch(categoryUpdateStarted());
    return serviceRegistry.getService(CATEGORIES_SERVICE).updateCategory(newData)
      .then(
        (response) => dispatch(categoryUpdated(response))
      );
  };
};

export const addCategory = (newData) => {
  return (dispatch, getState, serviceRegistry) => {
    dispatch(categoryAddStarted());
    return serviceRegistry.getService(CATEGORIES_SERVICE).addCategory(newData)
      .then(
        (response) => {
          dispatch(categoryAdded(response));
          dispatch(loadCategories());
        }
      );
  };
};

export const deleteCategory = (categoryId) => {
  return (dispatch, getState, serviceRegistry) => {
    dispatch(categoryDeleteStarted());
    return serviceRegistry.getService(CATEGORIES_SERVICE).deleteCategory(categoryId)
      .then(
        (response) => dispatch(categoryDeleted(categoryId))
      );
  };
};

const categoriesLoadingStarted = () => ({
  type: CATEGORIES_LOADING_STARTED
});

const categoriesLoaded = (categories) => ({
  type: CATEGORIES_LOADED,
  payload: [ ...categories ]
});

const categoriesLoadingError = (error) => ({
  type: CATEGORIES_LOADING_FAILED,
  payload: error
});

const categoryUpdateStarted = () => ({
  type: CATEGORY_UPDATE_STARTED
});

const categoryUpdated = (categoryData) => ({
  type: CATEGORY_UPDATED,
  payload: categoryData
});

const categoryAddStarted = () => ({
  type: CATEGORY_ADD_STARTED
});

const categoryAdded = (categoryData) => ({
  type: CATEGORY_ADDED,
  payload: categoryData
});

const categoryDeleteStarted = () => ({
  type: CATEGORY_DELETE_STARTED
});

const categoryDeleted = (categoryId) => ({
  type: CATEGORY_DELETED,
  payload: categoryId
});
