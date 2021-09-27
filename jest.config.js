module.exports = {
	roots: ['<rootDir>/src'],
	preset: 'ts-jest',
	moduleDirectories: ['node_modules', 'src'],
	testEnvironment: 'jest-environment-jsdom',
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
		// remove below line after removing less files
		'.+\\.(css|styl|less|sass|scss)$': 'jest-transform-css',
	},
	moduleNameMapper: {
		'^assets(.*)$': '<rootDir>/src/assets$1',
		'^components(.*)$': '<rootDir>/src/components$1',
		'^lib(.*)$': '<rootDir>/src/lib$1',
		'^styles(.*)$': '<rootDir>/src/styles$1',
		'^utils(.*)$': '<rootDir>/src/utils$1',
		'^logics(.*)$': '<rootDir>/src/logics$1',
		'^actions(.*)$': '<rootDir>/src/actions$1',
		'^client(.*)$': '<rootDir>/src/client$1',
		'^configs(.*)$': '<rootDir>/src/configs$1',
		'^store(.*)$': '<rootDir>/src/store$1',
		'^constants(.*)$': '<rootDir>/src/constants$1',
	},
};
