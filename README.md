[![npm](https://img.shields.io/npm/v/flavored-docker-compose.svg)](https://www.npmjs.com/package/flavored-docker-compose)
[![Build Status](https://travis-ci.org/flavors-js/flavored-docker-compose.svg?branch=master)](https://travis-ci.org/flavors-js/flavored-docker-compose)
[![David](https://img.shields.io/david/flavors-js/flavored-docker-compose.svg)](https://david-dm.org/flavors-js/flavored-docker-compose)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Join the chat at https://gitter.im/flavors-js/flavors](https://badges.gitter.im/flavors-js/flavors.svg)](https://gitter.im/flavors-js/flavors?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# flavored-docker-compose

[docker-compose](https://docs.docker.com/compose/) plugin for [Flavors CLI](https://github.com/flavors-js/flavors-cli).<br>

Adds to loaded configuration `dockerCompose` property containing object with the following properties:
- `files`: array containing `docker-compose.yml` file paths loaded from configuration tree; passed to `docker-compose` with multiple `-f` options;
- `projectName`: passed to `docker-compose` with `-p` option;
- `command`: path to custom `docker-compose` executable.

## Install

```shell script
$ npm install --save-dev flavors flavored-docker-compose
```

## Usage

You can pass it as a plugin to flavors [CLI](https://github.com/flavors-js/flavors#cli) and specify additional flavors options:

```shell script
$ npx flavors run [flavors options...] -p flavored-docker-compose [docker-compose options...] 
```

Or run directly with default flavors options:

```shell script
$ npx flavored-docker-compose [docker-compose options...]
```

Or use it with flavors command [runner](https://github.com/flavors-js/flavors#command-runner):

```javascript
const runner = require('flavors/runner');
runner({ plugin: require('flavored-docker-compose'), args: [/* docker-compose args, i.e. "up" */]}, configName, options);
```

## Maintainers

- [@mxl](https://github.com/mxl)

## License

See the [LICENSE](https://github.com/flavors-js/flavors-cli/blob/master/LICENSE) file for details.
