'use strict';

const
  assert = require('assert'),
  path = require('path');

function testPath(...names) {
  return path.resolve(__dirname, ...names);
}

const dockerComposeYml = 'docker-compose.yml';

describe('flavored-docker-compose', () => {
  it('collects docker-compose.yml files when `extends` is used', () => {
    const tp = (...names) => {
      return testPath('collectsFilesWithExtends', ...names);
    };
    assert.deepEqual(
      require('flavors-plugin-loader-config')({ configName: 'b-c', workingDir: tp() })(require('..'))
        .config.dockerCompose.files,
      [
        tp(dockerComposeYml),
        tp('a', dockerComposeYml),
        tp('b', dockerComposeYml),
        tp('b', 'c', dockerComposeYml)
      ]);
  });
});
