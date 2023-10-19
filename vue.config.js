const { defineConfig } = require("@vue/cli-service");
const path = require('path');
const fs = require('fs');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: process.env.LOCAL_DOMAIN_URL,
    port: 8080,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server.key'),'utf8'),
      cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'), 'utf8'),
    },
  }
});
