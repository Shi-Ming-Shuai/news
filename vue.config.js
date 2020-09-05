

//npm  install  path  --save
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // 服务器开发环境配置  (配置完以后要重启服务器)
  devServer: {
    // 代理  代理服务器
    proxy: {
      "/api": {  //当请求路径以 /api 开头时， 开发服务器需要代理到 http://study.yuanjin.tech
        target: "http://study.yuanjin.tech"
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("network", resolve("src/network"))
      .set("views", resolve("src/views"))
  },
}
