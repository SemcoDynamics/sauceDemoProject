# Project Name
![Image Description](https://www.google.com/url?sa=i&url=https%3A%2F%2Felixirautomation.medium.com%2Fautomated-api-testing-playwright-part-1-d8eea1ccf0aa&psig=AOvVaw35lgwx4vMap96gX0vv2S4H&ust=1732547631185000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNjawYOh9YkDFQAAAAAdAAAAABAE)


## Description
The purpose of this project, is to showcase and practise playwright test automation.
This project uses a combination of POM, API and fixtures to create simple and effective tests

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Running Tests](#running-tests)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation
To get started:
  1. Clone repo to your local machine
  2. cd to your project directory eg. cd ./documents/yourProject
  3. Install dependencies node.js by following instructions https://nodejs.org/en/download/package-manager
  4. Install playwright
    # Using npm
      npm init playwright@latest

## Usage
  To run your Playwright tests: npx playwright test

  # Run all tests
  npx playwright test

  # Run tests in a specific file
  npx playwright test tests/example.spec.ts

  # Generate a report
  npx playwright show-report

# Project Structure
SauceDemoProject/
   ├──Fixtures/
     ├── LoginAndNavigate.ts/
   ├── HelperFiles/
     ├── data.json/
   ├── tests/                   # Test files
     ├── API/
     ├── ApiMocking.spec.ts/
   ├── playwright.config.ts/     # Playwright configuration
   ├── package.json/             # Project metadata and scripts
   └── README.md/                # Project documentation

# Contributing
  Guidelines for contributing to your project. Include information on how to report issues, submit pull requests, and any coding standards.
  1. Fork the repository.
  2. Create a new branch (git checkout -b feature-branch).
  3. Make your changes and commit them (git commit -m 'Add new feature').
  4. Push to the branch (git push origin feature-branch).
  5. Open a pull request.