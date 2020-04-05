import React, {Component} from 'react';
import logo from '../logo.svg';

class App extends Component {
  render() {
    return (
        <div>
          <img className={'logo'} src={logo} alt="logo"/>
          <p className={'title'}>React App</p>
        </div>
    );
  }
}

export default App;