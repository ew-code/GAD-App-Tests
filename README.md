# Tests for GAD application

## GAD Application

Download the app GUI API Demo --> follow instructions in app README: `https://github.com/jaktestowac/gad-gui-api-demo`

## Prepare

### Local recommended tools

- VS Code
- Git
- Node.js (version >16)

### Installation and setup

- (optional) install VSC recommended plugins
- install dependencies: `npm install`
- setup Playwright with: `npx playwright install --with-deps chromium`
- setup husky with: `npx husky install`
- prepare local env file: `cp .env-template .env`
- install dotenv `npm i -D dotenv`
- copy application main as value of `BASE_URL` variable in `.env` file

## Use

Run all tests:

```
npx playwright test
```

Run single tagged test:

```
npx playwright test --grep @GAD-R01-01
```

Run all tests with tags:

```
npx playwright test --grep @GAD-R01

npx playwright test --grep "@GAD"

npx playwright test --grep @GAD-R03-01 --repeat-each=5
```

Run all tests without tags

```
npx playwright test --grep-invert @GAD-R01
```

For more usage cases look in `package.json` scripts section.
