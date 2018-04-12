# babel-plugin-transform-rax-styles



This [Babel](https://github.com/babel/babel) [transoformation](https://babeljs.io/docs/plugins/) auto-generates Rax [StyleSheet](https://facebook.github.io/react-native/docs/stylesheet.html)s from import statements of CSS files at compile time.

When used in the test environment（e.g  jest, mocha）, which usually only depend on Babel instead of Webpack，we need the suitable plugin。Since offical Rax only provide Webpack loader [stylesheet-loader](https://github.com/alibaba/rax/tree/master/packages/stylesheet-loader)，but lack of version for Babel plugin，so I create this Babel plugin。**This plugin is inspired by [babel-plugin-transform-styles](https://raw.githubusercontent.com/jmurzy/babel-plugin-transform-styles)**。


[![npm version](https://img.shields.io/npm/v/babel-plugin-transform-rax-styles.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-transform-rax-styles)
[![npm](https://img.shields.io/npm/l/babel-plugin-transform-rax-styles.svg)](https://github.com/boycgit/babel-plugin-transform-rax-styles/blob/master/LICENSE.md)

## Example

For example, given the following CSS file

```css
.container {
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #F5FCFF;
  margin: 10 5;
}
```

when imported as follows

```js
import styles from '../styles.css';

<Container style={styles.container} />

```

will be transformed to

```js
var styles = {
  "container": {
    "flex": 1,
    "justifyContent": "center",
    "alignItems": "center",
    "backgroundColor": "rgb(245,252,255)",
    "marginTop": "10rem",
    "marginRight": "5rem",
    "marginBottom": "10rem",
    "marginLeft": "5rem"
  }
};
```
## Requirements
[Babel](https://github.com/babel/babel) v6 or higher.

## Installation

```sh
$ npm install babel-plugin-transform-rax-styles
```

## Usage

### Via `.babelrc`

**.babelrc**

```json
{
  "plugins": ["transform-rax-styles"]
}
```

### Via Node API

```javascript
require('babel-core').transform('code', {
  plugins: ['transform-rax-styles']
});
```

### Contributing

Contributions are very welcome—bug fixes, features, documentation, tests. Just make sure the tests are passing.