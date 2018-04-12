import { transformFileSync } from 'babel-core';
import path from 'path';
import fs from 'fs';

const transform = (filename, config = {}) => {
	return transformFileSync(path.resolve(__dirname, filename), {
		babelrc: false,
		presets: ['env'],
		plugins: [['../../src/index.js', config]]
	});
};

const expectedStr = `'use strict';

var styles = {
  "container": {
    "flex": 1,
    "justifyContent": "center",
    "alignItems": "center",
    "backgroundColor": "rgb(245,252,255)",
    "marginTop": "10rem",
    "marginRight": "5rem",
    "marginBottom": "10rem",
    "marginLeft": "5rem",
    "iosShadowOpacity": 4,
    "iosShadowOffset": "2 4",
    "androidElevation": 1
  }
};`;

const expectedImportedStr = `'use strict';

var _styles = {
  "container": {
    "flex": 1,
    "justifyContent": "center",
    "alignItems": "center",
    "backgroundColor": "rgb(245,252,255)",
    "marginTop": "10rem",
    "marginRight": "5rem",
    "marginBottom": "10rem",
    "marginLeft": "5rem",
    "iosShadowOpacity": 4,
    "iosShadowOffset": "2 4",
    "androidElevation": 1
  }
};

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }`;

const expectedImportedExportStr = `'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;
var _styles = {
  "container": {
    "flex": 1,
    "justifyContent": "center",
    "alignItems": "center",
    "backgroundColor": "rgb(245,252,255)",
    "marginTop": "10rem",
    "marginRight": "5rem",
    "marginBottom": "10rem",
    "marginLeft": "5rem",
    "iosShadowOpacity": 4,
    "iosShadowOffset": "2 4",
    "androidElevation": 1
  }
};

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.styles = _styles2.default;`;

describe('transforms StyleSheet', () => {
	// 通过正常的 require 方式引入 style
	test('replaces require statements with StyleSheet', () => {
		const transformed = transform('fixtures/require-css.js');
		// console.log(transformed.code);
		expect(transformed.code).toBe(expectedStr);
	});
	// 通过正常的 import 方式引入 style
	test('replaces import statements with StyleSheet', () => {
		const transformed = transform('fixtures/import-css.js');
		expect(transformed.code).toBe(expectedImportedStr);
	});

	// 支持正常的 import + export 方式
	test('replaces import statements with filename and then exports', () => {
		const transformed = transform('fixtures/import-export-css.js');
		expect(transformed.code).toBe(expectedImportedExportStr);
	});

	// 不支持非赋值的方式引入样式
	test('throws error when import/require statements are empty', () => {
		expect(() => transform('fixtures/empty-require.js')).toThrow(
			/^.+: Found empty import from .+\.$/
		);

		expect(() => transform('fixtures/empty-import.js')).toThrow(
			/^.+: Found empty import from .+\.$/
		);
	});
});
