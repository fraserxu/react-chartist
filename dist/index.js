'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chartist = require('chartist');

var _chartist2 = _interopRequireDefault(_chartist);

var ChartistGraph = (function (_React$Component) {
  function ChartistGraph() {
    _classCallCheck(this, ChartistGraph);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(ChartistGraph, _React$Component);

  _createClass(ChartistGraph, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this.updateChart(newProps);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.chartist) {
        try {
          this.chartist.detach();
        } catch (err) {}
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      return this.updateChart(this.props);
    }
  }, {
    key: 'updateChart',
    value: function updateChart(config) {
      var type = config.type;
      var data = config.data;
      var options = config.options || {};
      var responsiveOptions = config.responsiveOptions || [];
      var event = undefined;

      if (this.chartist) {
        this.chartist.update(data, options, responsiveOptions);
      } else {
        this.chartist = new _chartist2['default'][type](_react2['default'].findDOMNode(this), data, options, responsiveOptions);

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
      }

      return this.chartist;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].DOM.div({ className: 'ct-chart' });
    }
  }]);

  return ChartistGraph;
})(_react2['default'].Component);

ChartistGraph.propTypes = {
  type: _react2['default'].PropTypes.string.isRequired,
  data: _react2['default'].PropTypes.object.isRequired,
  options: _react2['default'].PropTypes.object,
  responsiveOptions: _react2['default'].PropTypes.array
};

exports['default'] = ChartistGraph;
module.exports = exports['default'];

