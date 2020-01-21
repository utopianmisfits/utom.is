const defer = require("config/defer").deferConfig;

module.exports = {
  service: {
    name: "utom.is",
  },
  server: {
    port: 3000,
    // https://github.com/nfriedly/express-rate-limit
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 100,
    },
  },
  log: {
    level: "info",
    meta: false,
  },
  safeBrowsing: {
    clientId: process.env.SAFE_BROWSER_CLIENT_ID || "clientId",
    clientVersion: "1.0.0",
    apiKey: process.env.SAFE_BROWSING_API_KEY || "apiKey",
    domain: "https://safebrowsing.googleapis.com",
    path: defer(function() {
      return `/v4/threatMatches:find?key=${this.safeBrowsing.apiKey}`;
    }),
    url: defer(function() {
      return `${this.safeBrowsing.domain}${this.safeBrowsing.path}`;
    }),
  },
};
