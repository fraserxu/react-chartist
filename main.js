var React = require('react')
var ChartistGraph = require('react-chartist')

var Pie = React.createClass({
  render: function() {

    var simpleLineChartData = {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      series: [
        [12, 9, 7, 8, 5],
        [2, 1, 3.5, 7, 3],
        [1, 3, 4, 5, 6]
      ]
    }

    var lineChartData = {
      labels: [1, 2, 3, 4, 5, 6, 7, 8],
      series: [
        [5, 9, 7, 8, 5, 3, 5, 4]
      ]
    }

    var lineChartOptions = {
      low: 0,
      showArea: true
    }

    var biPolarLineChartData = {
      labels: [1, 2, 3, 4, 5, 6, 7, 8],
      series: [
        [1, 2, 3, 1, -2, 0, 1, 0],
        [-2, -1, -2, -1, -2.5, -1, -2, -1],
        [0, 0, 0, 1, 2, 2.5, 2, 1],
        [2.5, 2, 1, 0.5, 1, 0.5, -1, -2.5]
      ]
    }

    var biPolarLineChartOptions = {
      high: 3,
      low: -3,
      showArea: true,
      showLine: false,
      showPoint: false,
      axisX: {
        showLabel: false,
        showGrid: false
      }
    }

    var biPolarBarChartData = {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
      series: [
        [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
      ]
    };

    var biPolarBarChartOptions = {
      high: 10,
      low: -10,
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return index % 2 === 0 ? value : null;
        }
      }
    };

    return (
      <div className='container'>
        <section className='header'>
          <h1><a href='https://github.com/fraserxu/react-chartist'>react-chartist</a></h1>
          <p>React component for Chartist.js</p>
        </section>
        <section className='body'>
          <h4>Installation:</h4>
          <pre>
            <code>
              { "$ npm install react-chartist --save" }
            </code>
          </pre>
        </section>
        <section className='box'>
          <div className='box-header'>
            <h4>Usage: </h4>
          </div>
          <div className='box-header'>
            SIMPLE LINE CHART
          </div>
          <div className='code'>
            <pre>
              <code>
                {
                  "var React = require('react')\n" +
                  "var ChartistGraph = require('react-chartist')\n" +
                  "\n" +

                  "var simpleLineChartData = {\n" +
                  "  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],\n" +
                  "  series: [\n" +
                  "    [12, 9, 7, 8, 5],\n" +
                  "    [2, 1, 3.5, 7, 3],\n" +
                  "    [1, 3, 4, 5, 6]\n" +
                  "  ]\n" +
                  "}\n"
                }
                { "<ChartistGraph data={simpleLineChartData} type={'Line'} />" }
              </code>
            </pre>
          </div>
          <div className='graph'>
            <ChartistGraph data={simpleLineChartData} type={'Line'} />
          </div>
        </section>
        <section className='box'>
          <div className='box-header'>
            LINE CHART WITH AREA
          </div>
          <div className='code'>
            <pre>
              {
                "var React = require('react')\n" +
                "var ChartistGraph = require('react-chartist')\n" +
                "\n" +

                "var lineChartData = {\n" +
                "  labels: [1, 2, 3, 4, 5, 6, 7, 8],\n" +
                "  series: [\n" +
                "    [5, 9, 7, 8, 5, 3, 5, 4]\n" +
                "  ]\n" +
                "}\n" +

                "var lineChartOptions = {\n" +
                "  low: 0,\n" +
                "  showArea: true\n" +
                "}\n"
              }

              { "<ChartistGraph data={lineChartData} options={lineChartOptions} type={'Line'} />" }
            </pre>
          </div>
          <div className='graph'>
            <ChartistGraph data={lineChartData} options={lineChartOptions} type={'Line'} />
          </div>
        </section>
        <section className='box'>
          <div className='box-header'>
            BI-POLAR LINE CHART WITH AREA ONLY
          </div>
          <div className='code'>
            <pre>
              {
                "var React = require('react')\n" +
                "var ChartistGraph = require('react-chartist')\n" +
                "\n" +

                "var biPolarLineChartData = {\n" +
                "  labels: [1, 2, 3, 4, 5, 6, 7, 8],\n" +
                "  series: [\n" +
                "    [1, 2, 3, 1, -2, 0, 1, 0],\n" +
                "    [-2, -1, -2, -1, -2.5, -1, -2, -1],\n" +
                "    [0, 0, 0, 1, 2, 2.5, 2, 1],\n" +
                "    [2.5, 2, 1, 0.5, 1, 0.5, -1, -2.5]\n" +
                "  ]\n" +
                "}\n" +

                "var biPolarLineChartOptions = {\n" +
                "  high: 3,\n" +
                "  low: -3,\n" +
                "  showArea: true,\n" +
                "  showLine: false,\n" +
                "  showPoint: false,\n" +
                "  axisX: {\n" +
                "    showLabel: false,\n" +
                "    showGrid: false\n" +
                "  }\n" +
                "}\n"
              }
              { "<ChartistGraph data={biPolarLineChartData} options={biPolarLineChartOptions} type={'Line'} />" }
            </pre>
          </div>
          <div className='graph'>
            <ChartistGraph data={biPolarLineChartData} options={biPolarLineChartOptions} type={'Line'} />
          </div>
        </section>
        <section className='box'>
          <div className='box-header'>
            BI-POLAR BAR CHART
          </div>
          <div className='code'>
            <pre>
              {
                "var React = require('react')\n" +
                "var ChartistGraph = require('react-chartist')\n" +
                "\n" +

                "var biPolarBarChartData = {\n" +
                "  labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],\n" +
                "  series: [\n" +
                "    [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]\n" +
                "  ]\n" +
                "};\n" +

                "var biPolarBarChartOptions = {\n" +
                "  high: 10,\n" +
                "  low: -10,\n" +
                "  axisX: {\n" +
                "    labelInterpolationFnc: function(value, index) {\n" +
                "      return index % 2 === 0 ? value : null;\n" +
                "    }\n" +
                "  }\n" +
                "}\n"
              }
              { "<ChartistGraph data={biPolarBarChartData} options={biPolarBarChartOptions} type={'Line'} />" }
            </pre>
          </div>
          <div className='graph'>
            <ChartistGraph data={biPolarBarChartData} options={biPolarBarChartOptions} type={'Line'} />
          </div>
        </section>
        <section className='footer'>
          <p>Check more exmaple and API documentation on <a href='http://gionkunz.github.io/chartist-js/examples.html'>http://gionkunz.github.io/chartist-js/examples.html</a></p>
        </section>
      </div>
    )
  }
})

React.render(<Pie />, document.body)