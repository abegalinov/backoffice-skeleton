import BackofficeApp from './core/BackofficeApp';
import ServiceRegistry, { AUTH_SERVICE } from './core/services/ServicesRegistry';

import ListIcon from '@material-ui/icons/List';
import DashboardIcon from '@material-ui/icons/Dashboard';

import Dashboard from './components/Dashboard';
import Categories from './components/Categories';
import AuthService from './services/AuthService';
import MockCategoriesService from './services/MockCategoriesService';
import { CATEGORIES_SERVICE } from './services/servicesKeys';
import categoriesReducer from './state/categoriesReducer';

let serviceRegistry = new ServiceRegistry();

if (process.env.NODE_ENV !== 'development') {
    serviceRegistry.registerService(AUTH_SERVICE, new AuthService());    
 } else {
    serviceRegistry.registerService(CATEGORIES_SERVICE, new MockCategoriesService());
 }

const app = new BackofficeApp();

app.injectReducers({categories: categoriesReducer});

app.addResource({ path: "/", component: Dashboard, icon: DashboardIcon, name: "Dashboard", title: "Dashboard and statistics" });
app.addResource({ path: "/categories", component: Categories, icon: ListIcon, name: "Categories", title: "Categories management" });

app.mount('root');
