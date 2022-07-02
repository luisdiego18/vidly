const express = require("express");
const auth = require("../routers/auth");
const customers = require("../routers/customers");
const genres = require("../routers/genres");
const home = require("../routers/home");
const movies = require("../routers/movies");
const rentals = require("../routers/rentals");
const users = require("../routers/users");
const returns = require("../routers/returns");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/customers", customers);
  app.use("/api/genres", genres);
  app.use("/", home);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/returns", returns);
  app.use(error);
};
