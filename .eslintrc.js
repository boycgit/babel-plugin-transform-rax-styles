module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true
	},
	globals: {
		ENV: true
	},
	extends: 'eslint:recommended',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		sourceType: 'module'
	},
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always']
	}
};
