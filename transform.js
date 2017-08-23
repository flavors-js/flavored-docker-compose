'use strict';

const
  fs = require('fs'),
  path = require('path');

module.exports = (config, info) => {
  const c = config.dockerCompose = config.dockerCompose || {};
  if (!Array.isArray(c.files)) {
    c.files = [];
  }
  const dockerComposeFilePath = path.resolve(info.currentConfig.dir, c.fileName || 'docker-compose.yml');
  if (fs.existsSync(dockerComposeFilePath)) {
    c.files.push(dockerComposeFilePath);
  }
  return config;
};