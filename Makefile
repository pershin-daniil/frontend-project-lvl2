install:
	npm ci
link:
	npm link
lint:
	npx eslint .
test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8