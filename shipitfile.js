var pkg = require('./package.json')
var argv = require('yargs').argv
var deploy = require('shipit-deploy')

module.exports = function(shipit) {
  deploy(shipit)

  shipit.initConfig({
    default: {
      workspace: './',
      dirToCopy: './dist',
      deployTo: '/home/deploy/app',
      keepReleases: 5,
      deleteOnRollback: false,
      shallowClone: false,
    },
    dev: {
      servers: [
        {
          user: 'deploy',
          host: 'host',
        },
      ],
    },
    prod: {
      servers: [
        {
          user: 'deploy',
          host: 'host',
        },
        {
          user: 'deploy',
          host: 'host',
        },
      ],
    },
  })

  shipit.blTask('deploy', ['deploy:init', 'deploy:update', 'deploy:publish', 'deploy:clean'])
}
