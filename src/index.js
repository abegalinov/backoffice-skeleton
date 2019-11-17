import BackofficeApp from './core/BackofficeApp';
import ServiceRegistry, { AUTH_SERVICE } from './core/services/ServicesRegistry';

import ListIcon from '@material-ui/icons/List';
import DashboardIcon from '@material-ui/icons/Dashboard';

import Dashboard from './components/Dashboard';
import Categories from './components/Categories';
import AuthService from './services/AuthService';

if (process.env.NODE_ENV !== 'development') {
    let serviceRegistry = new ServiceRegistry();
    serviceRegistry.registerService(AUTH_SERVICE, new AuthService());    
}

const app = new BackofficeApp();
app.addResource({ path: "/", component: Dashboard, icon: DashboardIcon, title: "Dashboard" });
app.addResource({ path: "/categories", component: Categories, icon: ListIcon, title: "Categories" });

app.mount('root');
