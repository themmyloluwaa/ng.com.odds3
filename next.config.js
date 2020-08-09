//next.config.js
if (typeof require !== "undefined") {
  require.extensions[".less"] = () => {};
  require.extensions[".css"] = file => {};
}

module.exports = {
  env: {
    API_URL: "https://odds3-backend.now.sh/api",
    DEV_API: "http://localhost:4000/api",
    RAPIDAPIKEY: "72207a4508mshefd1284136e01eep1fefc2jsnb5b4ecebfacf",
    RAPIDAPIHOST: "api-football-v1.p.rapidapi.com"
  }
};
