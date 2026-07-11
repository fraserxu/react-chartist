# react-chartist

[![npm](https://img.shields.io/npm/v/react-chartist.svg)](https://www.npmjs.com/package/react-chartist)
[![CI](https://github.com/fraserxu/react-chartist/actions/workflows/ci.yml/badge.svg)](https://github.com/fraserxu/react-chartist/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/react-chartist.svg)](LICENSE)

A small, typed React component for [Chartist.js](https://chartist.dev/).

[View the live demo](https://fraserxu.github.io/react-chartist/)

Version 1 is a modern reboot for Chartist 1.x and React 18/19. It keeps the familiar
`<ChartistGraph>` API while replacing the legacy Babel build and old Chartist constructors.

## Install

```sh
npm install react-chartist chartist
```

Import Chartist's stylesheet once in your application:

```ts
import "chartist/dist/index.css";
```

## Usage

```tsx
import { useMemo } from "react";
import ChartistGraph from "react-chartist";
import "chartist/dist/index.css";

export function WeeklySalesChart() {
  const data = useMemo(
    () => ({
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      series: [[5, 9, 7, 8, 5]],
    }),
    [],
  );

  const options = useMemo(
    () => ({
      fullWidth: true,
      low: 0,
      showArea: true,
    }),
    [],
  );

  return (
    <ChartistGraph
      aria-label="Weekly sales"
      className="ct-major-twelfth"
      data={data}
      options={options}
      type="Line"
    />
  );
}
```

`data`, `options`, `responsiveOptions`, and `listener` are compared by reference. Memoize values
that do not need to change so Chartist does not perform unnecessary work.

## Props

The props are a discriminated TypeScript union, so `data`, `options`, and event payloads are typed
for the selected chart type.

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | `"Line" \| "Bar" \| "Pie"` | Yes | Selects the Chartist constructor. |
| `data` | Chartist data for `type` | Yes | Labels and series rendered by Chartist. |
| `options` | Chartist options for `type` | No | Updates the existing chart when its reference changes. |
| `responsiveOptions` | `[mediaQuery, options][]` | No | Recreates the chart when its reference changes. |
| `listener` | Typed event-handler map | No | Adds and removes Chartist event listeners. |
| `className` | `string` | No | Appended to the built-in `ct-chart` class. |

All other `<div>` attributes, including `aria-*`, `id`, `role`, and `style`, are forwarded to the
chart container.

### Responsive options

```tsx
const responsiveOptions = [
  ["screen and (max-width: 640px)", { showPoint: false }],
];

<ChartistGraph
  data={{ labels: ["A", "B"], series: [[3, 7]] }}
  responsiveOptions={responsiveOptions}
  type="Line"
/>;
```

Chartist only accepts responsive options when constructing a chart, so changing this prop safely
detaches and recreates the instance.

### Events

```tsx
<ChartistGraph
  data={{ series: [20, 30, 50] }}
  listener={{
    created: ({ svg }) => console.log(svg),
    draw: (event) => console.log(event.type),
  }}
  type="Pie"
/>;
```

### Accessing the Chartist instance

```tsx
import { useRef } from "react";
import ChartistGraph, { type ChartistGraphHandle } from "react-chartist";

const chartRef = useRef<ChartistGraphHandle>(null);

<ChartistGraph data={{ series: [[1, 2, 3]] }} ref={chartRef} type="Bar" />;

chartRef.current?.chart?.update();
```

The handle exposes `chart`, the current Chartist instance, and `element`, the owned container div.

## Accessibility

Charts are visual summaries, not accessible replacements for their source data. Add an accessible
name with `aria-label` or `aria-labelledby`, and provide the same information in text or a table
when users need to inspect exact values.

## Migrating from 0.x

Version 1 contains intentional breaking changes:

- Chartist `^1.5.0` replaces the old `^0.10.1` API.
- React `^18.2.0` and `^19.0.0` are supported; older React versions are not.
- Types now come directly from Chartist and are selected by the `type` prop.
- `responsiveOptions` uses the documented camel-case name and recreates the chart when changed.
- Event listeners now update when the `listener` prop changes.
- Children are no longer cloned into the Chartist-owned container.
- The imperative ref is `{ chart, element }` rather than the old class component instance.
- CommonJS users should use `const { ChartistGraph } = require("react-chartist")`.

## Development

Node 20.19 or newer is required for the development toolchain.

```sh
npm install
npm run check
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the project workflow.

## License

MIT © Fraser Xu
