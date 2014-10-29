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

  componentDidMount: function() {
    var type = this.props.type
    var data = this.props.data
    var options = this.props.options || {}
    var responsiveOptions = this.props.responsiveOptions || []
    new Chartist[type](this.getDOMNode(), data, options, responsiveOptions)
  },

  render: function() {
    return React.DOM.div({className: 'ct-chart'})
  }
})

module.exports = ChartistGraph