import BackofficeApp from './core/BackofficeApp';

import ListIcon from '@material-ui/icons/List';
import DashboardIcon from '@material-ui/icons/Dashboard';

import Dashboard from './components/Dashboard';
import Categories from './components/Categories';

const app = new BackofficeApp();
app.addResource({ path: "/", component: Dashboard, icon: DashboardIcon, title: "Dashboard" });
app.addResource({ path: "/categories", component: Categories, icon: ListIcon, title: "Categories" });

app.mount('root');
