"use strict";

// Load environment variables from the `.env` file.
require("dotenv").config();

module.exports = {
  // Server port.
  port: process.env.PORT || 8000,
  api_url: process.env.API_URL,
  app_url: process.env.ANUMATI_URL,
  client_api_key: process.env.CLIENT_API_KEY,
  rahasya_url: process.env.RAHASYA_URL,
  redirect_url: process.env.REDIRECT_URL
};
