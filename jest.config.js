module.exports = {
	setupFiles: ['jest-localstorage-mock'],
	moduleNameMapper: {
		'@src/(.*)': '<rootDir>/src/$1',
		'@contexts/(.*)': '<rootDir>/src/contexts.$1',
		'@lib/(.*)': '<rootDir>/src/lib.$1',
		'@services/(.*)': '<rootDir>/src/services.$1',
		'@styles/(.*)': '<rootDir>/src/styles.$1',
		'@mock/(.*)': '<rootDir>/__test__/mock/$1',
	},
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
	testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};
