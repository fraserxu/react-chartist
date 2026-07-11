# Contributing

Thanks for helping improve react-chartist.

## Setup

Use Node 20.19 or newer and npm 11.18 for the development toolchain.

```sh
npm install
npm run check
```

`npm run check` formats and lints the repository, type-checks the public API, runs the tests, and
builds the publishable package.

## Pull requests

- Add or update tests for behavioral changes.
- Keep the public API typed for each Chartist chart type.
- Update the README and changelog for user-facing changes.
- Do not commit `dist`; the release workflow builds it from source.

## Releases

1. Replace `Unreleased` in `CHANGELOG.md` with the release date.
2. Run `npm run check` and inspect `npm pack --dry-run`.
3. Commit the version and changelog, then create a matching GitHub release.
4. The release workflow publishes the package to npm with provenance.
