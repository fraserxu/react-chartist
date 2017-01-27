import React, { Component, cloneElement } from 'react';

class ChartistGraph extends Component {

  displayName: 'ChartistGraph'

  componentWillReceiveProps(newProps) {
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

  updateChart(config) {
    let Chartist = require('chartist');

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
    const { className, style, children, data, type } = this.props;
    return (
      <div className={`ct-chart ${className || ''}`} ref='chart' style={style}>
         {children && cloneElement(children, { type, data })}
      </div>
    )
  }

}

ChartistGraph.propTypes = {
  type: React.PropTypes.oneOf(['Line', 'Bar', 'Pie']).isRequired,
  data: React.PropTypes.object.isRequired,
  className: React.PropTypes.string,
  options: React.PropTypes.object,
  responsiveOptions: React.PropTypes.array,
  style: React.PropTypes.object
}

export default ChartistGraph;
