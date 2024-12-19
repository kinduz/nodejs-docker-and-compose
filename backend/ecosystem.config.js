require('dotenv').config();

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REPOSITORY,
  DEPLOY_REF = 'origin/master',

  POSTGRES_PASSWORD,
  JWT_SECRET,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_HOST,
} = process.env;

module.exports = {
  apps: [
    {
      name: 'app',
      script: './app.js',
      env_production: {
        NODE_ENV: 'production',
        POSTGRES_HOST,
        POSTGRES_USER,
        POSTGRES_PASSWORD,
        POSTGRES_DB,
        JWT_SECRET,
      },
    },
  ],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPOSITORY,
      path: DEPLOY_PATH,
    },
  },
};
