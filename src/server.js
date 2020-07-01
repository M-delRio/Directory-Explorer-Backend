import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./api/routes";

const app = express();

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

  console.log(405405405);

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

  if (!error.statusCode) error.statusCode = 500;

  if (error.statusCode === 404) {
    res.status(404);
    message = 'the requested ressource does not exist';
  }

  if (error.statusCode === 405) {
    res.status(405)
    message = 'unsupported http method';
  }

  return res
    .status(error.statusCode)
    .json({ message: message });
  // .json({ message: error.toString() });
});

module.exports = app;
