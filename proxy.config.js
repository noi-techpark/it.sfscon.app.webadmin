const PROXY_CONFIG = [
  {
    context: [
      "/api/**",
    ],
//    target: 'http://localhost:8000',
    target: 'https://m.opencon.dev',
    secure: false,
    ws: true,
    changeOrigin: true,
  },
  // {
  //   context: [
  //     "/api/**",
  //   ],
  //   target: 'https://stage.opencon.dev',
  //   secure: false,
  //   ws: true,
  //   changeOrigin: true,
  // }
];

module.exports = PROXY_CONFIG;
