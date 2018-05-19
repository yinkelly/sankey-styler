import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleOrdinal, schemeCategory10 } from 'd3';
import { sankey } from 'd3-sankey';
import AlluvialNode from './AlluvialNode';
import AlluvialLink from './AlluvialLink';

class Alluvial extends Component {
  render() {
    const {
      width, height, data, margin, nodePadding, colorScale, style
    } = this.props;

    const svg = {
      width: width + margin.l + margin.r,
      height: height + margin.t + margin.b,
    };

    const d3sankey = sankey()
      .nodeWidth(style.nodeWidth)
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
                style={{
                  opacity: style.nodeOpacity,
                  borderColor: style.nodeBorderColor,
                  borderWidth: style.nodeBorderWidth,
                  borderRadius: style.nodeBorderRadius
                }}
              />
            ))}
          </g>
          <g className="links">
            {graph.links.map(link => (
              <AlluvialLink
                key={`${link.source.name}-${link.target.name}`}
                link={link}
                style={{
                  opacity: style.linkOpacity,
                  color: style.linkColor
                }}
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
  nodePadding: PropTypes.number,
  colorScale: PropTypes.func,
};

Alluvial.defaultProps = {
  width: 800,
  height: 400,
  margin: {
    l: 10, t: 10, r: 80, b: 10,
  },
  nodePadding: 10,
  colorScale: scaleOrdinal(schemeCategory10),
};

export default Alluvial;
