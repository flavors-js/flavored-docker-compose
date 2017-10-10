'use strict';

const
  fs = require('fs'),
  path = require('path');

module.exports = (config, info) => {
  const c = config.dockerCompose || {};
  const files = c.files || [];
  const dockerComposeFilePath = path.resolve(info.currentConfig.dir, c.fileName || 'docker-compose.yml');
  if (fs.existsSync(dockerComposeFilePath)) {
    files.push(dockerComposeFilePath);
  }
  if (files.length > 0) {
    c.files = files;
    config.dockerCompose = c;
  }
  return config;
};