'use strict';

const
  assert = require('assert'),
  flavors = require('flavors'),
  merge = require('deepmerge'),
  path = require('path'),
  child = require('child_process'),
  cliPath = path.resolve(__dirname, '..', 'index.js'),
  dockerComposeYml = 'docker-compose.yml';

function testPath(...names) {
  return path.resolve(__dirname, ...names);
}

function outputEqual(expected, args, dir = '', env = {}) {
  assert.deepStrictEqual(child.execFileSync(cliPath, args, {
    cwd: testPath(dir),
    env: Object.assign({}, process.env, env)
  }).toString(), expected + '\n');
}

function runOutputEqual(expected, cwd, args, env = {}) {
  return outputEqual(expected, args, cwd, env);
}

describe('flavored-docker-compose', () => {
  it('collects docker-compose.yml files when `extends` is used', () => {
    const tp = (...names) => testPath('collectsFilesWithExtends', ...names);
    assert.deepStrictEqual(
      flavors('b-c', merge(require('..').options({}), {workingDir: tp()})),
      {
        dockerCompose: {
          files: [
            tp(dockerComposeYml),
            tp('a', dockerComposeYml),
            tp('a', 'd', dockerComposeYml),
            tp('b', dockerComposeYml),
            tp('b', 'c', dockerComposeYml)
          ]
        }
      });
  });

  it('runs as CLI', () => runOutputEqual(`-f ${path.resolve('test/runsAsCli/docker-compose.yml')} ` +
    `-f ${path.resolve('test/runsAsCli/a/docker-compose.yml')} ` +
    `-f ${path.resolve('test/runsAsCli/a/b/docker-compose.yml')} testArg`,
  'runsAsCli', ['testArg'], {FLAVORS_CONFIG_NAME: 'a-b'}));
});
