'use strict';

import React, {Component} from 'react';

const Chartist = require('chartist');

class ChartistGraph extends Component {

  displayName: 'ChartistGraph'

  shouldComponentUpdate(newProps) {
    const { data, className, type, options, style, responsiveOptions } = this.props;
    return data !== newProps.data
      || className !== newProps.className
      || type !== newProps.type
      || options !== newProps.options
      || style !== newProps.style
      || responsiveOptions !== newProps.responsiveOptions;
  }

  componentWillUpdate(newProps) {
    this.updateChart(newProps);
  }

  shouldComponentUpdate(nextProps, nextStates) {
    return nextProps != this.props;
  }

  componentWillUnmount() {
    if (this.chartist) {
      try {
        this.chartist.detach();
      }
      catch (err) {
        throw new Error('Internal chartist error', err);
      }
    }
  }

  componentDidMount() {
    this.updateChart(this.props);
  }

  updateChart(config) {
    let { type, data } = config;
    let options = config.options || {};
    let responsiveOptions = config.responsiveOptions || [];
    let event;

    if (this.chartist) {
      this.chartist.update(data, options, responsiveOptions);
    } else {
      this.chartist = new Chartist[type](this.refs.chart, data, options, responsiveOptions);

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
    const className = this.props.className ? ' ' + this.props.className : '';
    const style = this.props.style ? this.props.style : {};
    return (<div className={'ct-chart' + className} ref='chart' style={style} />)
  }
}

ChartistGraph.propTypes = {
  type: React.PropTypes.string.isRequired,
  data: React.PropTypes.object.isRequired,
  className: React.PropTypes.string,
  options: React.PropTypes.object,
  responsiveOptions: React.PropTypes.array,
  style: React.PropTypes.object
}

export const Graph = ChartistGraph;
export const Interpolation = Chartist.Interpolation;
export const Axis = Chartist.Axis;
