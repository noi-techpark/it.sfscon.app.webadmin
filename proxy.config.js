const PROXY_CONFIG = [
  {
    context: [
      "/api/**",
    ],
   target: 'http://localhost:8000',
    secure: false,
    ws: true,
    changeOrigin: true,
  },
];

module.exports = PROXY_CONFIG;
