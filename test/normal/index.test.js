import { transform } from '../util';

const expectedStr = `'use strict';

var styles = {
  "container": {
    "width": "750px",
    "backgroundColor": "rgb(238,238,238)"
  },
  "header": {
    "fontSize": "40px",
    "color": "white",
    "backgroundColor": "rgb(244,67,54)"
  },
  "body": {
    "fontSize": "20px"
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
