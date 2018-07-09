module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : 'blogindex',
      script    : './app-index.js',
      watch: [
        'dist',
        'client'
      ],
      ignore_watch: [
        'node_modules'
      ],
      env: {
        COMMON_VARIABLE: 'true',
        NODE_ENV: 'production'
      },
      error_file: './logs/blog-index-err.log',
      out_file: './logs/blog-index-out.log'
    },

    {
      name      : 'blogcms',
      script    : './app-cms.js',
      watch: [
        'dist'
      ],
      ignore_watch: [
        'node_modules'
      ],
      env: {
        COMMON_VARIABLE: 'true',
        NODE_ENV: 'production'
      },
      error_file: './logs/blog-cms-err.log',
      out_file: './logs/blog-cms-out.log'
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  // deploy : {
  //   production : {
  //     user : 'node',
  //     host : '212.83.163.1',
  //     ref  : 'origin/master',
  //     repo : 'git@github.com:repo.git',
  //     path : '/var/www/production',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
  //   },
  //   dev : {
  //     user : 'node',
  //     host : '212.83.163.1',
  //     ref  : 'origin/master',
  //     repo : 'git@github.com:repo.git',
  //     path : '/var/www/development',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
  //     env  : {
  //       NODE_ENV: 'dev'
  //     }
  //   }
  // }
};
