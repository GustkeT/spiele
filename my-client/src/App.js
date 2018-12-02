import React, { Component } from 'react';

import './styles/App.scss';
import Header from './components/header';

import Spiele from './components/spiele/spiele';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'SPIELE'
    }
  }

  render() {
    return(
      <div className="App">
        <Header title={this.state.title} />
        <div className="mt-5">
          <Spiele />
        </div>
      </div>
    );
  }
}

export default App;
