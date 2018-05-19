import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sankeyLinkHorizontal } from 'd3-sankey';
import { select } from 'd3';
import Radium from 'radium';

const styles = {
  link: {
    fill: 'none',
  },
};

class AlluvialLink extends Component {
  componentDidMount() {
    const { link, style } = this.props;
    select(this.link)
      .attr('stroke-width', 0)
      .style('stroke-opacity', 0)
      .transition()
      .delay(500)
      .duration(1000)
      .attr('stroke-width', Math.max(1, link.width))
      .style('stroke-opacity', style.opacity);
  }

  render() {
    const { link, style } = this.props
    const linkStyle = {
      stroke: style.color,
      strokeOpacity: style.opacity,
    }
    return (
      <path
        key={`${link.source.name}-${link.target.name}`}
        ref={element => this.link = element}
        d={sankeyLinkHorizontal()(link)}
        style={[styles.link, linkStyle]}
      />
    );
  }
}

AlluvialLink.propTypes = {
  link: PropTypes.object,
};

export default Radium(AlluvialLink);
