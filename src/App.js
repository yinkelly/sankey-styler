import React, { Component } from 'react';
import './App.css';
import CustomizableSankey from './containers/CustomizableSankey'
import data from './data.json'


class App extends Component {
  render() {
    return (
      <div className="App">
        <div class="container">
          <h1 className="App-title">Customise your Sankey!</h1>
          <CustomizableSankey data={data} />
        </div>
      </div>
    );
  }
}

export default App;
