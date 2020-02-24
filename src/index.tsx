import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import MainState from 'store/main/reducer';
import NotificationState from 'store/notification/reducer';

import thunk from 'redux-thunk';

import App from 'containers/App';

import 'index.scss';

const reducer = combineReducers({ main: MainState, notifications: NotificationState });

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
