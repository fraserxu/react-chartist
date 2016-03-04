rc-chartist
==============

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]


React component for [Chartist.js](https://gionkunz.github.io/chartist-js/)

### Installation

```
$ npm install rc-chartist --save
```

### Usage

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import { Graph, Interpolation } from '../index';

class Pie extends React.Component {
  render () {

    var data = {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
      series: [
        [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
      ]
    };

    var options = {
      high: 10,
      low: -10,
      // lineSmoothing: Interpolation.simple(),
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return index % 2 === 0 ? value : null;
        }
      }
    };

    var type = 'Bar'

    return (
      <div>
        <Graph data={data} options={options} type={type} />
      </div>
    )
  }
}

ReactDOM.render(<Pie />, document.body)

```

### Options

Please check out [Chartist.js API documentation](http://gionkunz.github.io/chartist-js/api-documentation.html) for more details of the options.

* data - chart data (required)
* type - chart type (required)
* style - inline css styles (optional)
* options - chart options (optional)
* responsive-options - chart responsive options (optional)

To add support for aspect ratio

```HTML
<Graph className={'ct-octave'} data={data} options={options} type={type} />
```

### Note

This module does not include the css files for Chartist. If you want to add it, include their CDN in your html file

```HTML
<link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
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

### Changelog

Updated package to expose the entire Chartist API.

### License

MIT

[npm-image]: https://img.shields.io/npm/v/rc-chartist.svg?style=flat-square
[npm-url]: https://npmjs.org/package/rc-chartist
[downloads-image]: https://img.shields.io/npm/dm/rc-chartist.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/rc-chartist

