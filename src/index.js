import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
import 'bootstrap/dist/css/bootstrap.css';
import AddressContainer from './containers/AddressContainer';



const store = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <AddressContainer />
  </Provider>
  , document.getElementById('root'));