'use strict';

import React from 'react';
import Chartist from 'chartist';

class ChartistGraph extends React.Component {

  displayName: 'ChartistGraph'

  componentWillReceiveProps(newProps) {
    this.updateChart(newProps);
  }

  componentWillUnmount() {
    if (this.chartist) {
      try {
        this.chartist.detach();
      } catch (err) {
      }
    }
  }

  componentDidMount() {
    return this.updateChart(this.props);
  }

  updateChart(config) {
    let type = config.type;
    let data = config.data;
    let options = config.options || {};
    let responsiveOptions = config.responsiveOptions || [];
    let event;

   if (this.chartist) {
      this.chartist.update(data, options, responsiveOptions)
    } else {
      this.chartist = new _Chartist2['default'][type](_React2['default'].findDOMNode(this), data, options, responsiveOptions);

      if (config.listener) {
        for (event in config.listener) {
          if (config.listener.hasOwnProperty(event)) {
            this.chartist.on(event, config.listener[event]);
          }
        }
      }
    }

    return this.chartist;

  }

  render() {
    return React.DOM.div({className: 'ct-chart'})
  }

}

ChartistGraph.propTypes = {
  type: React.PropTypes.string.isRequired,
  data: React.PropTypes.object.isRequired,
  options: React.PropTypes.object,
  responsiveOptions: React.PropTypes.array
}

export default ChartistGraph;
