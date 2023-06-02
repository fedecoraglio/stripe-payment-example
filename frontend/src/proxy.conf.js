const PROXY_CONFIG = [
  {
    context: ['/v1'],
    target: 'http://localhost:4560',
    secure: true,
    logLevel: 'debug',
  },
];

module.exports = PROXY_CONFIG;
