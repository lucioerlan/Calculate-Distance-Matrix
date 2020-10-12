module.exports = {
  apps: [
      {
          name: 'ROUTES_FRONTEND',
          script: './node_modules/react-scripts/scripts/start.js',
          autorestart: true,
          watch: false,
          exec_mode: 'fork',
          env: {
              NODE_ENV: 'development',
              PORT: 3000
          }
      }
  ]
}