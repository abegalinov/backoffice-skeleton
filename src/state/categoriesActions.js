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
  CATEGORY_DELETED,
  CATEGORY_MOVING_UP,
  CATEGORY_MOVING_DOWN,
  CATEGORY_MOVED_UP,
  CATEGORY_MOVED_DOWN
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
        (updatedCategoryData) => dispatch(categoryUpdated(updatedCategoryData))
      );
  };
};

export const addCategory = (newData) => {
  return (dispatch, getState, serviceRegistry) => {
    dispatch(categoryAddStarted());
    return serviceRegistry.getService(CATEGORIES_SERVICE).addCategory(newData)
      .then(
        (newCategory) => dispatch(categoryAdded(newCategory))
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

export const moveCategoryUp = (categoryId) => {
  return (dispatch, getState, serviceRegistry) => {
    dispatch(categoryMovingUpStarted());
    return serviceRegistry.getService(CATEGORIES_SERVICE).moveCategoryUp(categoryId)
      .then(
        (categoriesList) => dispatch(categoryMovedUp(categoriesList))
      );
  };
};

export const moveCategoryDown = (categoryId) => {
  return (dispatch, getState, serviceRegistry) => {
    dispatch(categoryMovingDownStarted());
    return serviceRegistry.getService(CATEGORIES_SERVICE).moveCategoryDown(categoryId)
      .then(
        (categoriesList) => dispatch(categoryMovedDown(categoriesList))
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

const categoryUpdated = (updatedCategoryData) => ({
  type: CATEGORY_UPDATED,
  payload: updatedCategoryData
});

const categoryAddStarted = () => ({
  type: CATEGORY_ADD_STARTED
});

const categoryAdded = (newCategoryData) => ({
  type: CATEGORY_ADDED,
  payload: newCategoryData
});

const categoryDeleteStarted = () => ({
  type: CATEGORY_DELETE_STARTED
});

const categoryDeleted = (categoryId) => ({
  type: CATEGORY_DELETED,
  payload: categoryId
});

const categoryMovingUpStarted = (categoryId) => ({
  type: CATEGORY_MOVING_UP,
  payload: categoryId
});

const categoryMovedUp = (newCategoriesList) => ({
  type: CATEGORY_MOVED_UP,
  payload: newCategoriesList
});

const categoryMovingDownStarted = (categoryId) => ({
  type: CATEGORY_MOVING_DOWN,
  payload: categoryId
});

const categoryMovedDown = (newCategoriesList) => ({
  type: CATEGORY_MOVED_DOWN,
  payload: newCategoriesList
});
