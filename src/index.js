import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import Form from './Form/Form.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import store from './store/index.js';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/' component={Form} />
        <Route exact path='/home' component={App} />
        <Route path='*' component={Form} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
