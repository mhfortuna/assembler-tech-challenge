const dotenv = require("dotenv");

dotenv.config();

const { MONGO_DB_URL, PORT, GIPHY_API_KEY } = process.env;

const CONFIG = {
  app: {
    port: PORT || 4000,
  },
  db: {
    url: MONGO_DB_URL,
  },
  giphy: {
    apiKey: GIPHY_API_KEY,
  },
};

module.exports = {
  config: CONFIG,
};
