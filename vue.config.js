const fs = require("fs");
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    https: {
      cert: fs.readFileSync("BGT.crt"),
      key: fs.readFileSync("ca.key"),
    },
    headers: {
      "Access-Control-Allow-Origin": "https://dev.bgt.ascalan.com",
    },
  },
});
