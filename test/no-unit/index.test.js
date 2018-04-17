import { transform } from '../util';

const expectedStr = `'use strict';

var styles = {
  "container": {
    "paddingTop": "48rem",
    "paddingRight": "0rem",
    "paddingBottom": "12rem",
    "paddingLeft": "24rem",
    "backgroundColor": "white"
  },
  "content1Col": {
    "color": "rgb(136,136,136)",
    "fontSize": 26,
    "width": 578,
    "marginTop": -5
  }
};`;

describe('normal:', () => {
	// 通过正常的 require 方式引入 style
	test('replaces require statements with StyleSheet', () => {
		const transformed = transform('fixtures/require-css.js', __dirname);
		// console.log(transformed.code);
		expect(transformed.code).toBe(expectedStr);
	});
});
