<p align="center"><img src="assets/brand/logo.gif" width="256" /></p>

<h1 align="center">Firereact</h1>

<p align="center"><em>This project is a 3rd-party project and is not affiliated or endorsed by React or Firebase and their owners, Alphabet and Meta.</em></p>

<p align="center">
    <a href="https://www.npmjs.com/package/firereact">
        <img src="https://img.shields.io/npm/v/firereact?style=flat-square&amp;logo=npm&amp;logoColor=white" alt="NPM Version" />
    </a>
    <a href="https://www.npmjs.com/package/firereact">
        <img alt="NPM Downloads" src="https://img.shields.io/npm/dw/firereact" />
    </a>
    <img src="https://img.shields.io/npm/l/firereact?style=flat-square&amp;logo=npm&amp;logoColor=white" alt="NPM License" />
    <a href="https://github.com/erayerdin/firereact/actions">
        <img src="https://img.shields.io/github/actions/workflow/status/erayerdin/firereact/check.yaml?branch=main&amp;style=flat-square&amp;logo=github&amp;logoColor=white&amp;label=check" alt="GitHub Actions Workflow Status" />
    </a>
    <a href="https://app.codecov.io/gh/erayerdin/firereact">
        <img src="https://img.shields.io/codecov/c/github/erayerdin/firereact?token=Nw2dQOJfbC&amp;style=flat-square&amp;logo=codecov&amp;logoColor=white" alt="Codecov" />
    </a>
    <a href="https://bundlephobia.com/package/firereact@latest">
        <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/firereact?style=flat-square&logo=bundlephobia&logoColor=white" />
    </a>
    <a href="https://bundlephobia.com/package/firereact@latest">
        <img alt="npm minzipped size" src="https://img.shields.io/bundlephobia/minzip/firereact?style=flat-square&logo=bundlephobia&logoColor=white" />
    </a>
    <a href="http://firereact.erayerdin.com/">
        <img src="https://img.shields.io/readthedocs/firereact?style=flat-square&amp;logo=readthedocs&amp;logoColor=white" alt="Read the Docs" />
    </a>
</p>

<p align="center">Firereact is hooks, component and utilities library for Firebase and React.</p>

## Installation

You can install the package via NPM:

```bash
npm i firereact
```

## Features

- Very lightweight, ![unpacked size](https://img.shields.io/npm/unpacked-size/firereact?label=%20&style=flat-square)
  when unpacked, ![npm min bundle size](https://img.shields.io/bundlephobia/min/firereact?style=flat-square&label=%20) when minified, ![npm minzip bundle size](https://img.shields.io/bundlephobia/minzip/firereact?style=flat-square&label=%20) when minified+gzipped
- Supports ![Javascript](https://img.shields.io/badge/-javascript-f7df1e?style=flat-square&logo=javascript&logoColor=black) and ![Typescript](https://img.shields.io/badge/-typescript-3178c6?style=flat-square&logo=javascript&logoColor=white)
- Supports Auth, Firestore, Functions, Providers and Storage.
- Provides hooks such as `useUser` for Auth or `useDocument` for Firestore, which can listen to realtime changes as well
- Provides custom components such as `<FirestoreDocument />` or `<StorageDownloadLink />` to keep the logic simple and/or avoid unnecessary rerendering
- Provides `Provider`s such as `FirebaseSuiteProvider`, `FirebaseAuthProvider` or `FirestoreProvider` to access Firebase service instances anywhere in the component tree without relying on global variables or prop-drilling
- Comprehensive documentation

## Documentation

To use this library, check out the documentation [here](https://firereact.erayerdin.com/).

## Contributing

You are welcome to contribute to the project. Before contributing:

- Always send pull requests to `dev` branch, which is the default branch of this repository. `main` branch is used for latest published version.
- You agree our [code of conduct](CODE_OF_CONDUCT.md).

## License

This library is licensed under [MIT License](https://www.tldrlegal.com/license/mit-license#w-tabs-0-data-w-pane-1).
