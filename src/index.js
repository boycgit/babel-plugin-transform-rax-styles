import { dirname, isAbsolute, resolve } from 'path';
import { readFileSync } from 'fs';
import { toStyleSheet } from 'rax-stylesheet-util';
import { debugMini, debugError } from './debug';

function resolveModulePath(filename) {
	const dir = dirname(filename);
	if (isAbsolute(dir)) {
		return dir;
	}
	if (process.env.PWD) {
		return resolve(process.env.PWD, dir);
	}
	return resolve(dir);
}

const defaultOptions = { extensions: ['css'] };

export default function({ types: t }) {
	return {
		visitor: {
			CallExpression(path, { file, opts }) {
				debugMini(`opts: ${JSON.stringify(opts)}`);
				// ...
				const currentConfig = { ...defaultOptions, ...opts };

				const { callee: { name: calleeName }, arguments: args } = path.node;

				try {
					debugMini(
						`[start]calleeName: ${calleeName}, args: ${JSON.stringify(args)}`
					);
				} catch (error) {
					debugError(`[visitor] ${error}`);
				}

				// 检验条件，需要 `require('xxxx.css') 或者 import 'xxxx.css'` 这样的调用形式
				if (
					calleeName !== 'require' ||
					!args.length ||
					!t.isStringLiteral(args[0])
				) {
					return;
				}

				debugMini(`[end not return]`);

				// 检查后缀名
				const isValidExtension = currentConfig.extensions.find(ext =>
					args[0].value.endsWith(ext)
				);

				if (isValidExtension) {
					const [{ value: filePath }] = args;

					// 确保引入的文件需要被赋值
					if (!t.isVariableDeclarator(path.parent)) {
						throw new Error(`Found empty import from ${filePath}.`);
					}

					const from = resolveModulePath(file.opts.filename);
					const source = readFileSync(resolve(from, filePath), 'utf8');
					const styleString = toStyleSheet(source);

					// 替换原来的表达式
					path.replaceWithSourceString(styleString);
				}
			}
		}
	};
}
