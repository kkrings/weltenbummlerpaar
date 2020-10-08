module.exports = {
  apps: [{
    name: 'weltenbummlerpaar-backend',
    script: 'node_modules/weltenbummlerpaar-backend/bin/weltenbummlerpaar.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      DEBUG: 'weltenbummlerpaar-backend:*',
    },
  }],
};
