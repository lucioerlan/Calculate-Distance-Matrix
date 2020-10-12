module.exports = {
  apps: [
    {
      name: 'ROUTES_BACKEND',
      script: './server.js',
      autorestart: true,
      watch: false,
      exec_mode: 'fork',
	
    },
  ],
};
