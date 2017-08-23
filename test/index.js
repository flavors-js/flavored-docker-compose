'use strict';

const
  assert = require('assert'),
  path = require('path');

function testPath(...names) {
  return path.resolve(__dirname, ...names);
}

const dockerComposeYml = 'docker-compose.yml';

describe('flavored-docker-compose', () => {
  it('collects docker-compose.yml files', () => {
    const tp = (...names) => {
      return testPath('collectsFiles', ...names);
    };
    assert.deepEqual(require('flavors')('a-b', {transform: require('../transform'), workingDir: tp()}).dockerCompose.files, [
      tp(dockerComposeYml),
      tp('a', dockerComposeYml),
      tp('a', 'b', dockerComposeYml)
    ]);
  });
  it('collects docker-compose.yml files when configDirName is set', () => {
    const tp = (...names) => {
      return testPath('collectsFilesConfigDirName', ...names);
    };
    const n = 'config';
    assert.deepEqual(require('flavors')('a-b', {configDirName: n, transform: require('../transform'), workingDir: tp()}).dockerCompose.files, [
      tp(dockerComposeYml),
      tp(n, 'a', dockerComposeYml),
      tp(n, 'a', n, 'b', dockerComposeYml)
    ]);
  });
});
