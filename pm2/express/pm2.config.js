module.exports = {
    apps: [
      {
        name: 'service1',
        script: 'service1/index.js',
        watch: true,
        ignore_watch: ['node_modules'],
        autorestart: true, 
        min_uptime: 10000,
      },
      {
        name: 'service2',
        script: 'service2/index.js',
        watch: true,
        ignore_watch: ['node_modules'],
        autorestart: true,
        min_uptime: 10000,
      },
    ],
  };
  