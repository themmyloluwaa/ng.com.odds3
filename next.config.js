const path = require("path");
const dev = process.env.NODE_ENV !== "production";
module.exports = {
  webpack: config => {
    config.plugins.push(
      new Dotenv({
        path: path.join(
          __dirname,
          dev ? ".env.development" : ".env.production"
        ),
        systemvars: true
      })
    );
    config.resolve.extensions = [".js", ".jsx"];
    return config;
  }
};
