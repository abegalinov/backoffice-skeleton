# Backoffice skeleton
Simple backoffice frontend applications framework.

## Getting Started

The framework is based on react, redux and material-ui. Kind of a skeleton that allows you to build admin interfaces and avoid additional boilerplate when starting from scratch.

It was inspired by react-admin and admin-on-rest frameworks. 
However, the motivation is to make it more customizable and actually build applications using react and redux, instead of configuring something to achieve desired results.

It supports authorization, navigation menu and basically nothing else. 

In order to start building applications you just need to inject your components, redux reducers and services to the application and from that point on you can focus on your application development. Also, it supports the service registry which is self-sort of a dependency injection mechanism where services can be injected as well as the existing services can be overridden.

### Installing

Just simply install the npm package and you are ready to go:

```bash
npm install @abegalinov/backoffice-skeleton
```

## Usage

```javascript
import BackOfficeSkeleton from '@abegalinov/backoffice-skeleton';
import { AUTH_SERVICE } from '@abegalinov/services';

const app = new BackOfficeSkeleton();

app.addResource({ path: "/", component: YourComponent, icon: MaterialUIIconComponent, name: "Menu item", title: "Component title" });
app.getServiceRegistry().registerService(AUTH_SERVICE, new YourAuthService());
app.injectReducers({yourReducerNamespace: yourReducer});

const App = app.createComponent();

ReactDOM.render(<App />, document.getElementById('root'));
```

The simple setup above makes a component to be shown in the navigation menu and also mounts the component on `/` route. Also, it injects a custom authorization service, which is mocked by default. You can have a look at how the mock works in `src/services/MockAuthService.js` to understand the concept in order to write a real one.

Also in the example above it is shown how a reducer getting injected in the application, you can write a reducer for your application which would affect the store state (actually its part by namespace, since `combineReducers()` is used).

One more small thing to mention: in the dispatched actions (functions, because `thunk` is being used) you can access `ServiceRegistry`, it is passed as the third argument to the function along with `dispatch`, `getState`.

Update: a small piece of functionality was added in order to use authorization token in different services outside the app main instance you can now simply call:

```javascript
const app = new BackOfficeSkeleton();
const getToken = app.getAuthTokenCallback();

// and then in order to make an authorized request call the callback to get the authorization token:

const authToken = getToken();
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
