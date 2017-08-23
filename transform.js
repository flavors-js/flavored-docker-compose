'use strict';

const
  fs = require('fs'),
  path = require('path');

module.exports = (config, info) => {
  const c = config.dockerCompose;
  if (!c.dockerCompose) {
    c.dockerCompose = {};
  }
  if (!Array.isArray(c.dockerCompose.files)) {
    c.dockerCompose.files = [];
  }
  const dockerComposeFilePath = path.resolve(info.dir, c.fileName || 'docker-compose.yml');
  if (fs.existsSync(dockerComposeFilePath)) {
    c.dockerCompose.files.push(dockerComposeFilePath);
  }
  return c;
};