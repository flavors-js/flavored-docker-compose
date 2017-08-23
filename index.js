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
      args: args,
      command: c.command || 'docker-compose'
    };
  },
  options: {
    transform: require('./transform')
  }
};
