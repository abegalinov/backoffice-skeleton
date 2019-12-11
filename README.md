Yet another backoffice frontend framework

Based on react, redux, matirial-ui and material-table, kind of a skeleton that allows to build admin interfaces and avoid additional boilerplate when starting from scratch.
The framework was inspired by react-admin and admin-on-rest frameworks, however the motivation behind is to make it more customizable and to be able to actually build applications using react and redux, not just configuring something to achive desired results.
It supports authorization, navigation menu and basically nothing else. 
In order to start building applications you just need to inject your components and their reducers to the application and also it supports service registry which is self sort of a dependency injection mechanism where services can be injected as well as the existing services can be overriden.

TODO (updating):
* add tests for app categories state: reducers, actions
* add BackOfficeApp.js, AuthDto.js tests
* create real CategoriesService that requests backend and create test for that
