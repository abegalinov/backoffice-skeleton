import ServiceRegistry from "../core/services/ServicesRegistry";

import { CATEGORIES_SERVICE } from "../services/servicesKeys";
import { CATEGORIES_LOADED, CATEGORIES_LOADING_FAILED, CATEGORIES_LOADING_STARTED } from "./categoriesActionTypes";


const serviceRegistry = new ServiceRegistry();

export const loadCategories = () => {
  const categoriesSevice = serviceRegistry.getService(CATEGORIES_SERVICE);

  return dispatch => {
    dispatch(categoriesLoadingStarted());
    categoriesSevice.getCategories().then(categoriesData => {
        dispatch(categoriesLoaded(categoriesData));
    }).catch(error => {
        dispatch(categoriesLoadingError(error));
    });
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
