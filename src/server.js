require('dotenv').config();
// const express = require("express");
// const cors = require("cors");
// const routes = require("./api/routes");
// const compression = require("compression");
// const helmet = require("helmet");

import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./api/routes";
import compression from "compression"
import helmet from "helmet"

const app = express();

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/folders", routes.folder);

app.get('*', function (req, res, next) {
  const error = new Error(
    `${req.ip} tried to access ${req.originalUrl}`,
  );

  error.statusCode = 404;
  next(error);
});

app.post('*', function (req, res, next) {
  const error = new Error(
    `${req.ip} tried to access ${req.originalUrl}`,
  );

  error.statusCode = 405;
  next(error);
});

app.put('*', function (req, res, next) {
  const error = new Error(
    `${req.ip} tried to access ${req.originalUrl}`,
  );
  error.statusCode = 405;
  next(error);
});

app.patch('*', function (req, res, next) {
  const error = new Error(
    `${req.ip} tried to access ${req.originalUrl}`,
  );

  error.statusCode = 405;
  next(error);
});

app.delete('*', function (req, res, next) {
  const error = new Error(
    `${req.ip} tried to access ${req.originalUrl}`,
  );

  error.statusCode = 405;
  next(error);
});

app.use((error, req, res, next) => {
  let message;

  if (error.code === "INVCHAR") {
    res.status(422);
    message = "Forward slash character cannot be part of a folder's name";
  } else if (error.code === "INVPERIOD") {
    res.status(422);
    message = "Moving up a folder is not permitted";
  } else if (error.code === "ENOENT") {
    res.status(422);
    message = "Folder not found";
  } else if (error.statusCode === 404) {
    res.status(404);
    message = 'The requested ressource does not exist';
  } else if (error.statusCode === 405) {
    res.status(405)
    message = 'Unsupported http method';
  } else {
    res.status(500)
    message = 'Server side error of unknown type';
  }

  return res
    // .status(error.statusCode)
    .json({ message: message });
  // .json({ message: error.toString() });
});

module.exports = app;
