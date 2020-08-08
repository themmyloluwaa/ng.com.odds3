//next.config.js
if (typeof require !== "undefined") {
  require.extensions[".less"] = () => {};
  require.extensions[".css"] = file => {};
}

module.exports = {
  env: {
    API_URL: "https://odds3-backend.now.sh/api",
    DEV_API: "http://localhost:4000/api"
  }
};
