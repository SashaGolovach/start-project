import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import App from './containers/App';
import createStore from './store';
import 'normalize.css';

const history = createHashHistory();
const store = createStore({ history });

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
