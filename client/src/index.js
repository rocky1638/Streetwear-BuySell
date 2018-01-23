import 'jquery/src/jquery';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/bootstrap-social.css';
import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import SignUp from './components/Signup';
import Results from './components/Results';
import UpdateInfo from './components/UpdateInfo';
import AddListing from './components/AddListing';
import ListingDetails from './components/ListingDetails';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/results/details/:id" component={ListingDetails} />
          <Route path="/results" component={Results} />
          <Route exact path="/profile/update_info" component={UpdateInfo} />
          <Route exact path="/profile/add_listing" component={AddListing} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);
