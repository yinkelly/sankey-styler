import React, { Component } from 'react';
import Alluvial from '../components/Alluvial'
import data from '../data.json'

class CustomizableSankey extends Component {
  constructor(props) {
      super(props);

      // Properties of graphical elements controllable by users
      this.state = {
        node: {
          width: 3,
          cornerRadius: 3,
          opacity: 0.2,
          borderColor: 'white',
          borderWidth: 0
        },
        link: {
          opacity: 0.4,
          fill: 'black'
        }
      }
  }

  updateVariables(newProp) {
    // Look up deep object update
    this.setState({
      ...this.state,
      ...newProp
    })
  }

  render() {
    return (
      <div>
        <Alluvial data={data} nodeStyle={this.state.node} linkStyle={this.state.link}/>
      </div>
    );
  }
}

export default CustomizableSankey;
