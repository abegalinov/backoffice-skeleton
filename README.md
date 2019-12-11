# Backoffice skeleton
Simple backoffice frontend applications framework.

## Getting Started

The framework is based on react, redux and matirial-ui kind of a skeleton that allows to build an admin interfaces and avoid additional boilerplate when starting from scratch.

It was inspired by react-admin and admin-on-rest frameworks. 
However the motivation is to make it more customizable and to be able to actually build applications using react and redux, not just configuring something to achieve desired results.

It supports authorization, navigation menu and basically nothing else. 

In order to start building applications you just need to inject your components and their redux reducers to the application and also it supports service registry which is self-sort of a dependency injection mechanism where services can be injected as well as the existing services can be overridden.

### Installing

Just simple install the npm package and you are ready to go.

```bash
npm install @abegalinov/backoffice-skeleton
```

## Usage

```javascript
import BackSkeleton, { AUTH_SERVICE } from '@abegalinov/backoffice-skeleton';

const app = new BackOfficeSkeleton();

app.addResource({ path: "/", component: YourComponent, icon: MaterialUIIconComponent, name: "Menu item", title: "Component title" });

app.getServiceRegistry().registerService(AUTH_SERVICE, new AuthService());

app.injectReducers({storeReducerNamespace: reducer});

const App = app.createComponent();

ReactDOM.render(<App />, document.getElementById('root'));
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
