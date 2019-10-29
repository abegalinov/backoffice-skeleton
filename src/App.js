import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { changeLoggedIn } from './actions';

const Nav = () => (
  <ul>
    <Link to="/friends/"><li>Friends</li></Link>
    <Link to="/books/"><li>Books</li></Link>
  </ul>
)

const Friends = () => <h1>Friends</h1>
const Books = () => <h1>Books</h1>

const App = (props) => (
  <div>
    <Nav />
    <button onClick={() => { props.changeLoggedIn(false) }}>Logout</button>
    <Switch>
      <Route exact path="/friends/" component={Friends} />
      <Route exact path="/books/" component={Books} />
      <Redirect exact from="/" to="/friends/" />
    </Switch>
  </div>
)

export default connect(
  state => ({
    loggedIn: state.loggedIn,
  }),
  {
    changeLoggedIn
  }
)(App);
