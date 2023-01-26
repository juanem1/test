# Deel Test
This is an API implemented with express, typescript, sequelize and jest.

## Asumptions
1. All IDs are positive integer numbers (including 0)
2. When the client pay a job, the contract is terminated

## Improvements that I do not implement due to lack of time
1. More robust validations
2. Error handling using a middleware
3. /admin endpoints
4. Implement custom error class with message and status code
5. Implement a logging library
6. More extensive tests and coverage
7. JSON Schema
8. Swagger
9. Build mechanism

## Instalation
To install all the necesary dependencies, run the following command.
```
npm install
```

## Set env vars
```
mv .env.example .env
```

## Seed Database
To create and seed the database, run the following command.
```
npm run seed
```

## Import collection for POSTMAN / INSOMNIA
There is a `collection.har` file with the configured requests, to easily test the app.

## Run developmet mode
To start a local server, run the following command.
```
npm run start:dev
```
Then, go to http://127.0.0.1:3001/

## Quality
---
The app is provided with eslint, prettier and tests.

```
// Lint code
npm run lint
npm run lint:fix

// Ejecute prettier
npm run prettier
npm run prettier:fix

// Run all tests
npm run test
```
