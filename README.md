react-chartist
==============

React component for Chartist.js

### Installation

```
$ npm install react-chartist --save
```

### Usage

```
var ChartistGraph = require('react-chartist')

var Pie = React.createClass({
  render: function() {

    var type = 'Pie'
    var data = {
      series: [20, 10, 30, 40]
    }

    return (
      <div>
        <ChartistGraph data={data} type={type} />
      </div>
    )
  }
})
```

### Options

* data - chart data (required)
* type - chart type (required)
* options - chart options (optional)
* responsive-options - chart responsive options (optional)

### License

MIT