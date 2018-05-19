import React, { Component } from 'react';
import Alluvial from '../components/Alluvial'
import data from '../data.json'

const controlConfigs = {
  node: {
    width: { type: 'number', min: 0.5, max: 100, step: 0.5 },
    cornerRadius: { type: 'number', min: 0, max: 100, step: 1 },
    opacity: { type: 'number', min: 0, max: 1, step: 0.1 },
    borderColor: { type: 'string'},
    borderWidth: { type: 'number', min: 0, max: 100, step: 1 }
  },
  link: {
    opacity: { type: 'number', min: 0, max: 1, step: 0.1 },
    fill: { type: 'string'},
  }
}

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
        <div class="contol-container">
          {['node', 'link'].map(element => {
            return <ControllerGroup controls={controlConfigs[element]} onChange={this.updateVariables} />
          })}
        </div>
        <Alluvial data={data} nodeStyle={this.state.node} linkStyle={this.state.link}/>
      </div>
    );
  }
}

export default CustomizableSankey;
