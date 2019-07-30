#!/usr/bin/env node
'use strict';

module.exports = {
  command: config => {
    const c = config.dockerCompose || {};
    const args = [];
    if (c.projectName) {
      args.push('-p', c.projectName);
    }
    if (c.files) {
      for (let f of c.files) {
        args.push('-f', f);
      }
    }
    return {
      args,
      command: c.command || 'docker-compose'
    };
  },
  options: options => ({
    merge: (x, y) => {
      const merge = options.merge || require('flavors').defaultOptions.merge;
      const result = merge(x, y);
      const getFiles = v => ((v.dockerCompose || {}).files || []);
      const files = [...new Set([...getFiles(x), ...getFiles(y)])];
      if (files) {
        if (!result.dockerCompose) {
          result.dockerCompose = {};
        }
        result.dockerCompose.files = files;
      }
      return result;
    },
    transform: require('./transform')
  })
};

if (require.main === module) {
  process.argv = [...process.argv.slice(0, 2), 'run', '-p', __dirname, ...process.argv.slice(2)];
  // console.error(process.argv);
  require('flavors/cli')();
}