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
  }
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

  componentDidUpdate() {
    const { node } = this.props;
    select(this.nodeGroup)
      .attr('transform', `translate(${node.x0}, ${node.y0})`);
  }

  render() {
    const { node, colorScale, style } = this.props;
    const rectStyle = {
      stroke: style.borderColor,
      strokeWidth: style.borderWidth,
      fillOpacity: style.opacity,
    }
    return (
      <g
        key={node.index}
        ref={element => this.nodeGroup = element}
      >
        <rect
          ref={element => this.nodeMarker = element}
          rx={style.borderRadius}
          ry={style.borderRadius}
          width={node.x1 - node.x0}
          fill={colorScale(node.name).replace(/ .*/, '')}
          style={rectStyle}
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
  style: PropTypes.object,
};

AlluvialNode.defaultProps = {
  colorScale: scaleOrdinal(schemeCategory10),
};

export default Radium(AlluvialNode);
