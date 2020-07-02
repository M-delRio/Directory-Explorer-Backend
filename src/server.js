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

  // console.log(error.code);
  if (error.code === "INVCHAR") {
    res.status(422);
    message = "/ character cannot be part of a folder's name";
  } else if (error.code === "INVPERIOD") {
    res.status(422);
    message = "moving up a folder is not permitted";
  } else if (error.code === "ENOENT") {
    res.status(422);
    message = "Folder not found!";
  } else if (error.statusCode === 404) {
    res.status(404);
    message = 'the requested ressource does not exist';
  } else if (error.statusCode === 405) {
    res.status(405)
    message = 'unsupported http method';
  } else {
    res.status(500)
    message = 'server side error of unknown type';
  }

  return res
    // .status(error.statusCode)
    .json({ message: message });
  // .json({ message: error.toString() });
});

module.exports = app;
