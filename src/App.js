import React, { Component } from 'react'
import Radium from 'radium'
import CustomizableSankey from './containers/CustomizableSankey'
import data from './data.json'
import './App.css'

const styles = {
  container: {
    maxWidth: 1000,
    margin: 'auto'
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container" style={styles.container}>
          <h1 className="App-title">Customise your Sankey!</h1>
          <CustomizableSankey data={data} />
        </div>
      </div>
    )
  }
}

export default Radium(App)
