import { transformFileSync } from 'babel-core';
import path from 'path';
import fs from 'fs';

export const transform = (filename, dir = __dirname, config = {}) => {
	return transformFileSync(path.resolve(dir, filename), {
		babelrc: false,
		presets: ['env'],
		plugins: [['../../../src/index.js', config]]
	});
};
