# Playwright Tests for GAD Application

The repository contains code for **automated tests** of the **GAD app (GUI API Demo)** created using the **Playwright library** with **TypeScript**.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
  - [Running Tests](#running-tests)
  - [Tagged Tests](#tagged-tests)
  - [Running Tests without Tags](#running-tests-without-tags)
- [Scripts and More](#scripts-and-more)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project automates end-to-end and integration testing of the GAD application using [Playwright](https://playwright.dev/). The tests are written in **TypeScript** to ensure type safety and maintainability.

The repository contains code for **automated tests** of the **GAD app (GUI API Demo)** created using the **Playwright library**. You can download the GAD application for testing purposes from the [official repo](https://github.com/jaktestowac/gad-gui-api-demo). Follow the instructions in its README to set up the app.

## Features

- Automated end-to-end testing with Playwright
- TypeScript support for strong typing and maintainable code
- Configurable environment via `.env` file
- Tests can be tagged for easy execution of specific scenarios
- Git hooks with Husky to enforce code quality

## Prerequisites

Make sure the following tools are installed on your system:

- [VS Code](https://code.visualstudio.com/) (recommended for development)
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) (version >16)
  
Optional, but recommended:

- Install **VS Code recommended plugins** for better development experience.

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo-url
   cd your-repo-url
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Playwright**:
   ```bash
   npx playwright install --with-deps chromium
   ```

4. **Set up Husky for Git hooks** (optional):
   ```bash
   npx husky install
   ```

5. **Prepare environment variables**:
   - Copy the `.env-template` to `.env`:
     ```bash
     cp .env-template .env
     ```
   - Install `dotenv` for environment management:
     ```bash
     npm i -D dotenv
     ```
   - Update the `BASE_URL` variable in `.env` to point to the GAD application's main URL.

## Usage

### Running Tests

To run all tests in the Playwright test suite, use the following command:

```bash
npx playwright test
```

### Tagged Tests

You can run specific tests by using tags defined in your test cases. For example:

- Run a single tagged test:
  ```bash
  npx playwright test --grep @GAD-R01-01
  ```

- Run all tests with specific tags:
  ```bash
  npx playwright test --grep @GAD-R01
  ```

  Or:
  ```bash
  npx playwright test --grep "@GAD"
  ```

- Run a specific test multiple times:
  ```bash
  npx playwright test --grep @GAD-R03-01 --repeat-each=5
  ```

### Running Tests Without Tags

To run all tests that **do not have a specific tag**, use the `--grep-invert` option:

```bash
npx playwright test --grep-invert @GAD-R01
```

### Scripts and More

For additional use cases, such as running tests in specific browsers or using other Playwright features, check the `scripts` section in the `package.json` file. You can customize commands to fit your testing needs.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request. Ensure that your changes are well-documented and tested.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
