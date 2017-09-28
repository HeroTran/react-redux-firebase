import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../reducers';




export default class App extends React.Component{
  render() {
    return (
      <div className="content-app">
        {this.props.children}
      </div>
    );
  }
}
