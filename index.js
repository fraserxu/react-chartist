'use strict';

import React from 'react';

class ChartistGraph extends React.Component {

  displayName: 'ChartistGraph'

  componentWillReceiveProps(newProps) {
    this.updateListener(this.props, true /* shouldRemoveListener */);
    this.updateChart(newProps);
  }

  componentWillUnmount() {
    if (this.chartist) {
      try {
        this.chartist.detach();
      } catch (err) {
        throw new Error('Internal chartist error', err);
      }
    }
  }

  componentDidMount() {
    this.updateChart(this.props);
  }

  updateListener(config, shouldRemoveListener) {
    if (this.chartist && config.listener) {
      for (event in config.listener) {
        if (config.listener.hasOwnProperty(event)) {
          if (shouldRemoveListener) {
            this.chartist.off(event, config.listener[event]);
          } else {
            this.chartist.on(event, config.listener[event]);
          }
        }
      }
    }
  }

  updateChart(config) {
    let Chartist = require('chartist');

    let { type, data } = config;
    let options = config.options || {};
    let responsiveOptions = config.responsiveOptions || [];
    let event;

    if (this.chartist) {
      this.updateListener(config);
      this.chartist.update(data, options, responsiveOptions);
    } else {
      this.chartist = new Chartist[type](React.findDOMNode(this), data, options, responsiveOptions);
      this.updateListener(config);
    }

    return this.chartist;
  }

  render() {
    let className = this.props.className ? ' ' + this.props.className : ''
    return React.DOM.div({className: 'ct-chart' + className})
  }

}

ChartistGraph.propTypes = {
  type: React.PropTypes.string.isRequired,
  data: React.PropTypes.object.isRequired,
  className: React.PropTypes.string,
  options: React.PropTypes.object,
  responsiveOptions: React.PropTypes.array
}

export default ChartistGraph;
