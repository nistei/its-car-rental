<p align="center">
  <a href="https://www.fh-salzburg.ac.at/" target="blank"><img src="https://www.fh-salzburg.ac.at/typo3conf/ext/fhs_main/Resources/Public/images/logo-text.svg" width="320" alt="FH Salzburg" /></a>
</p>

## Requirements

- NodeJS 14 or newer
- npm Package Manager
- Docker (Database, Redis)

## Installation

```bash
# install dependencies and create secrets
$ npm install
```

## Running the app

```bash
# start a database using docker-compose
$ npm run compose

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Open your browser on [localhost:3000](http://localhost:3000)

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

  This application is [MIT licensed](LICENSE).
