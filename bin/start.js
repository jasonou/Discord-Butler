const Server = require('../server');

process.on('SIGINT', () => Server.stop());
process.on('SIGTERM', () => Server.stop());
