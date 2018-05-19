import React, { Component } from 'react'
import Radium from 'radium'
import Alluvial from '../components/Alluvial'
import data from '../data.json'

const styles = {
  controls: {
    display: 'auto',
  },
  input: {
    padding: 5,
    margin: 5
  },
  label: {
    margin: '10px 5px 10px 15px'
  }
}

const controlConfigs = {
  nodeWidth: { type: 'number', min: 0.5, max: 100, step: 0.5 },
  nodeOpacity: { type: 'number', min: 0, max: 1, step: 0.1 },
  nodeBorderColor: { type: 'text'},
  nodeBorderWidth: { type: 'number', min: 0, max: 100, step: 1 },
  nodeBorderRadius: { type: 'number', min: 0, max: 100, step: 1 },
  linkOpacity: { type: 'number', min: 0, max: 1, step: 0.1 },
  linkColor: { type: 'text'}
}

class CustomizableSankey extends Component {
  constructor(props) {
      super(props);

      // Properties of graphical elements controllable by users
      this.state = {
        nodeWidth: 10,
        nodeOpacity: 0.8,
        nodeBorderColor: 'none',
        nodeBorderWidth: 0,
        nodeBorderRadius: 3,
        linkOpacity: 0.4,
        linkColor: 'gray'
      }
  }

  renderControl([name, config]) {
    return (
      <div key={name} className="control-wrapper">
        <label style={styles.label}>{name}</label>
        {config.type === 'number'
          ? <input
            type="number"
            min={config.min}
            max={config.max}
            step={config.step}
            value={this.state[name]}
            style={styles.input}
            onChange={e => this.setState({[name]: Number(e.target.value)})} />
          : <input
            type="text"
            name={this.props.name}
            value={this.state[name]}
            style={styles.input}
            onChange={e => this.setState({[name]: e.target.value})} />
        }
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className="controls" style={styles.controls}>
          {Object.entries(controlConfigs).map((c) => this.renderControl(c))}
        </div>
        <Alluvial
          data={data}
          style={this.state} />
      </div>
    )
  }
}

export default Radium(CustomizableSankey)
