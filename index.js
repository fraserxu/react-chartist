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
    return this.updateChart(newProps);
  },

  updateChart: function(config) {
    var type = config.type
    var data = config.data
    var options = config.options || {}
    var responsiveOptions = config.responsiveOptions || []
    return new Chartist[type](this.getDOMNode(), data, options, responsiveOptions);
  },

  componentDidMount: function() {
    return this.updateChart(this.props);
  },

  render: function() {
    return React.DOM.div({className: 'ct-chart'})
  }

});

module.exports = ChartistGraph
