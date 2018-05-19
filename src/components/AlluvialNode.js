import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { select, scaleOrdinal, schemeCategory10 } from 'd3';
import Radium from 'radium';

const styles = {
  text: {
    base: {
      dominantBaseline: 'middle',
      pointerEvents: 'none',
      textAnchor: 'start',
    },
    leftMost: {
      textAnchor: 'end',
    },
  },
  rect: {
    stroke: 'none',
    fillOpacity: 0.8,
    ':hover': {
      fillOpacity: 1,
    },
  },
};

class AlluvialNode extends Component {
  componentDidMount() {
    const { node } = this.props;

    const initPosition = node.y0 + ((node.y1 - node.y0) / 2);

    // animation: node expands to full height from center
    select(this.nodeGroup)
      .attr('transform', `translate(${node.x0}, ${initPosition})`)
      .transition()
      .delay(500)
      .duration(1000)
      .attr('transform', `translate(${node.x0}, ${node.y0})`);

    select(this.nodeMarker)
      .attr('height', 0)
      .transition()
      .delay(500)
      .duration(1000)
      .attr('height', node.y1 - node.y0);

    // animation: label fades in from node
    select(this.nodeLabel)
      .attr('x', 0)
      .style('opacity', 0)
      .transition()
      .delay(1500)
      .duration(500)
      .attr('x', 20)
      .style('opacity', 1);
  }

  // shouldComponentUpdate(nextProps) {
  // }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('componentDidUnmount');
  }

  render() {
    const { node, colorScale, borderRadius } = this.props;
    return (
      <g
        key={node.index}
        ref={element => this.nodeGroup = element}
      >
        <rect
          ref={element => this.nodeMarker = element}
          rx={borderRadius}
          ry={borderRadius}
          width={node.x1 - node.x0}
          fill={colorScale(node.name).replace(/ .*/, '')}
          stroke="#000"
          style={styles.rect}
        />
        <text
          ref={element => this.nodeLabel = element}
          y={(node.y1 - node.y0) / 2}
          style={styles.text.base}
        >
          {node.name}
        </text>
      </g>
    );
  }
}

AlluvialNode.propTypes = {
  node: PropTypes.object.isRequired,
  colorScale: PropTypes.func,
  borderRadius: PropTypes.number,
};

AlluvialNode.defaultProps = {
  colorScale: scaleOrdinal(schemeCategory10),
  borderRadius: 3,
};

export default Radium(AlluvialNode);
