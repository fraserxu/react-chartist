react-chartist
==============

React component for Chartist.js

### Installation

```
$ npm install react-chartist --save
```

### Usage

```
import React from 'react';
import ChartistGraph from '../index';

class Pie extends React.Component {
  render() {

    var data = {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
      series: [
        [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
      ]
    };

    var options = {
      high: 10,
      low: -10,
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return index % 2 === 0 ? value : null;
        }
      }
    };

    var type = 'Bar'

    return (
      <div>
        <ChartistGraph data={data} options={options} type={type} />
      </div>
    )
  }
}

React.render(<Pie />, document.body)

```

### Options

Please check out [Chartist.js API documentation](http://gionkunz.github.io/chartist-js/api-documentation.html) for more details of the options.

* data - chart data (required)
* type - chart type (required)
* options - chart options (optional)
* responsive-options - chart responsive options (optional)

### Note

This module does not include the css files for Chartist. If you want to add it, include their CDN in your html file

```
<link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
<script src="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>
```

Or use `bower` or `npm` to install Chartist and include it in your build process.

```
$ npm install chartist
```

Or

```
$ bower install chartist
```

### Development

```
$ npm install
```

To build run `npm run build`

### License

MIT
