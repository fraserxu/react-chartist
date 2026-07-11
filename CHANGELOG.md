# Changelog

All notable changes to this project are documented in this file. The project follows
[Semantic Versioning](https://semver.org/).

## 1.0.0 - 2026-07-11

### Added

- First-class Chartist 1.5 support.
- React 18 and React 19 peer support.
- Discriminated TypeScript props for line, bar, and pie charts.
- Typed Chartist event handlers and a stable imperative ref handle.
- ESM and CommonJS builds with source maps and declarations.
- Unit and Chartist integration tests, continuous integration, and automated npm publishing.

### Changed

- Rebuilt the component with React hooks and Chartist's modern named constructors.
- Data and options update in place; chart type and responsive option changes recreate the chart.
- Replaced Babel 6 and Stage-0 with TypeScript, tsup, Vitest, and Biome.
- Updated all documentation and examples for current React and Chartist usage.

### Removed

- Support for React 0.14 through 17 and Chartist 0.x.
- Runtime PropTypes and the external `@types/chartist` package.
- Implicit prop injection into child elements.
- The obsolete Browserify/Bower example.

## 0.14.4 - 2021-02-02

- Added React 17 to the peer dependency range.
