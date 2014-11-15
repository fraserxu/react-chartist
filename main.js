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
        <section className='box'>
          <div className='code'>
            <pre>
              SIMPLE LINE CHART
            </pre>
          </div>
          <div className='graph'>
            <ChartistGraph data={simpleLineChartData} type={'Line'} />
          </div>
        </section>
        <section className='box'>
          <div className='code'>
            <pre>
              LINE CHART WITH AREA
            </pre>
          </div>
          <div className='graph'>
            <ChartistGraph data={lineChartData} options={lineChartOptions} type={'Line'} />
          </div>
        </section>
        <section className='box'>
          <div className='code'>
            <pre>
              BI-POLAR LINE CHART WITH AREA ONLY
            </pre>
          </div>
          <div className='graph'>
            <ChartistGraph data={biPolarLineChartData} options={biPolarLineChartOptions} type={'Line'} />
          </div>
        </section>
        <section className='box'>
          <div className='code'>
            <pre>
              BI-POLAR BAR CHART
            </pre>
          </div>
          <div className='graph'>
            <ChartistGraph data={biPolarBarChartData} options={biPolarBarChartOptions} type={'Line'} />
          </div>
        </section>
      </div>
    )
  }
})

React.render(<Pie />, document.body)