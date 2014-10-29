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
$ bower isntall chartist
```

### License

MIT