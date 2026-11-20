# Playwright API Automation Framework

A reusable API automation testing framework built using **Playwright, TypeScript and Zod**. This project demonstrates API testing fundamentals, reusable test utilities, response schema validation, test data management and continuous integration using GitHub Actions.

## Technologies Used

- **Playwright** – API automation and test execution
- **TypeScript** – Type-safe test development
- **Zod** – Runtime API response schema validation
- **Node.js & npm** – Project runtime and dependency management
- **Dotenv** – Environment variable configuration
- **GitHub Actions** – Continuous integration

## Project Structure

```text
Playwright-API-Automation/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── tests/
│   ├── constants/
│   │   └── api-endpoints.ts
│   │
│   ├── fixtures/
│   │   └── api-fixture.ts
│   │
│   ├── products/
│   │   └── product.spec.ts
│   │
│   ├── schemas/
│   │   └── product.schema.ts
│   │
│   ├── test-data/
│   │   └── products.json
│   │
│   └── utils/
│       └── api-helper.ts
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── tsconfig.json
```

## API Test Coverage

The framework currently contains 13 API tests covering:

| HTTP Method | Test Scenarios |
|---|---|
| GET | Retrieve all products |
| GET | Retrieve a single product |
| GET | Retrieve a product using an invalid ID |
| GET | Search products by keyword |
| GET | Validate pagination |
| GET | Validate response headers |
| GET | Search with no matching results |
| POST | Create a new product |
| POST | Create a product with an empty request body |
| POST | Submit a product with a string price |
| PUT | Update an existing product |
| PATCH | Update a product price |
| DELETE | Delete an existing product |

## Framework Features

### Reusable API Helper

A custom API helper provides reusable methods for:

- GET
- POST
- PUT
- PATCH
- DELETE

### Custom Fixtures

A custom Playwright fixture initializes and provides the API helper to test cases, reducing repeated setup code.

### Schema Validation with Zod

Zod schemas validate API response structures and data types at runtime.

Separate schemas are maintained for product listings, individual products, creation responses, update responses, deletion responses and error responses.

### External Test Data

Test data is maintained in JSON files separately from test implementation, making it easier to maintain and reuse.

### Environment Configuration

The API base URL is configured using environment variables through dotenv.

## Getting Started

### Prerequisites

- Node.js 24 or compatible supported version
- npm
- Git

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Playwright-API-Automation
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Configure environment variables

Create a `.env` file in the project root.

Copy the contents of `.env.example` into `.env`.

```env
API_BASE_URL=https://dummyjson.com
```

### 4. Run API tests

```bash
npm test
```

### 5. Run TypeScript validation

```bash
npm run typecheck
```

### 6. View the HTML test report

```bash
npm run test:report
```

## Available npm Scripts

| Command | Description |
|---|---|
| `npm test` | Execute all API tests |
| `npm run typecheck` | Check TypeScript compilation |
| `npm run test:report` | Open the Playwright HTML report |

## Continuous Integration

GitHub Actions is configured to execute the framework automatically on:

- Pushes to the `main` or `master` branches
- Pull requests targeting the `main` or `master` branches

The workflow:

1. Checks out the repository.
2. Sets up Node.js.
3. Installs dependencies using `npm ci`.
4. Runs TypeScript validation.
5. Executes API tests.
6. Uploads the Playwright HTML report as a workflow artifact.

## API Under Test

This framework currently uses [DummyJSON](https://dummyjson.com/) as its API testing environment.

**Note:** DummyJSON simulates certain write operations. Product creation, updates and deletion are not persisted like operations against a production database. Some validation behaviours may also differ from a real production API.

## Project Status

- 13 API tests implemented
- TypeScript validation passing
- Playwright HTML reporting configured
- GitHub Actions workflow configured


## Future Framework Improvements

The framework will continue to evolve with the following planned enhancements:

- Implement token-based authentication (Bearer tokens) and reusable authentication management.
- Add token expiry and refresh handling.
- Implement API request chaining and dynamic test data generation.
- Expand negative testing, boundary-value testing and authorization scenarios.
- Introduce centralised request and response logging.
- Add API contract validation and response-time assertions.
- Develop reusable API clients for different resources.
- Enhance CI/CD workflows, automated reporting and scheduled test execution.
---


**Author:** Aagy Paulose

**Project:** Playwright API Automation Framework