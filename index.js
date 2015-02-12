'use strict'

var React = require('react')
var Chartist = require('chartist')

var ChartistGraph = React.createClass({

  displayName: 'ChartistGraph',

  propTypes: {
    type: React.PropTypes.string.isRequired,
    data: React.PropTypes.object.isRequired,
    options: React.PropTypes.object,
    responsiveOptions: React.PropTypes.array
  },

  componentWillReceiveProps: function(newProps) {
    this.updateChart(newProps);
  },

  componentWillUnmount: function() {
    if (this.chartist) {
      try {
        this.chartist.detach();
      } catch (err) {
      }
    }
  },

  updateChart: function(config) {
    var type = config.type
    var data = config.data
    var options = config.options || {}
    var responsiveOptions = config.responsiveOptions || []
    var event;

    
    if (this.chartist) {
      //this sometimes cause some error internal within chartist.
      try {
        this.chartist.detach();
      } catch (err) {

      }
    }
    this.chartist = new Chartist[type](this.getDOMNode(), data, options, responsiveOptions);

    //register event handlers
    /**
     * listeners: {
     *   draw : function() {}
     * } 
     */
    if (config.listener) {
      for (event in config.listener) {
        if (config.listener.hasOwnProperty(event)) {
          this.chartist.on(event, config.listener[event]);
        }
      }
    }
    //return
    return this.chartist;

  },

  componentDidMount: function() {
    return this.updateChart(this.props);
  },

  render: function() {
    return React.DOM.div({className: 'ct-chart ' + this.props.className});
  }

});

module.exports = ChartistGraph
