import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleOrdinal, schemeCategory10 } from 'd3';
import { sankey } from 'd3-sankey';
import AlluvialNode from './AlluvialNode';
import AlluvialLink from './AlluvialLink';

class Alluvial extends Component {
  // componentDidMount() {
  // }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('componentDidUnmount');
  }

  render() {
    const {
      width, height, data, margin, nodeWidth, nodePadding, colorScale,
    } = this.props;

    // let formatNumber = d3.format(',.0f'),
    //   format = function (d) { return `${formatNumber(d)} TWh`; },

    const svg = {
      width: width + margin.l + margin.r,
      height: height + margin.t + margin.b,
    };

    const d3sankey = sankey()
      .nodeWidth(nodeWidth)
      .nodePadding(nodePadding)
      .extent([[1, 1], [width - 1, height - 6]]);

    // Data object is mutated here!
    const graph = d3sankey(data);

    return (
      <svg
        width={svg.width}
        height={svg.height}
      >
        <g transform={`translate(${margin.l}, ${margin.t})`}>
          <g className="nodes">
            {graph.nodes.map(node => (
              <AlluvialNode
                key={node.index}
                node={node}
                colorScale={colorScale}
              />
            ))}
          </g>
          <g className="links">
            {graph.links.map(link => (
              <AlluvialLink
                key={`${link.source.name}-${link.target.name}`}
                link={link}
              />))}
          </g>
        </g>
      </svg>
    );
  }
}

Alluvial.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.object,
  margin: PropTypes.object,
  nodeWidth: PropTypes.number,
  nodePadding: PropTypes.number,
  colorScale: PropTypes.func,
};

Alluvial.defaultProps = {
  width: 800,
  height: 400,
  margin: {
    l: 10, t: 10, r: 80, b: 10,
  },
  nodeWidth: 10,
  nodePadding: 10,
  colorScale: scaleOrdinal(schemeCategory10),
};

export default Alluvial;
