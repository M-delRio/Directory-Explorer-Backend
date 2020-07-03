"use strict";

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _routes = _interopRequireDefault(require("./api/routes"));

var _compression = _interopRequireDefault(require("compression"));

var _helmet = _interopRequireDefault(require("helmet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use((0, _compression.default)());
app.use((0, _helmet.default)());
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use("/folders", _routes.default.folder);
app.get('*', function (req, res, next) {
  const error = new Error(`${req.ip} tried to access ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});
app.post('*', function (req, res, next) {
  const error = new Error(`${req.ip} tried to access ${req.originalUrl}`);
  error.statusCode = 405;
  next(error);
});
app.put('*', function (req, res, next) {
  const error = new Error(`${req.ip} tried to access ${req.originalUrl}`);
  error.statusCode = 405;
  next(error);
});
app.patch('*', function (req, res, next) {
  const error = new Error(`${req.ip} tried to access ${req.originalUrl}`);
  error.statusCode = 405;
  next(error);
});
app.delete('*', function (req, res, next) {
  const error = new Error(`${req.ip} tried to access ${req.originalUrl}`);
  error.statusCode = 405;
  next(error);
});
app.use((error, req, res, next) => {
  let message; // console.log(error.code);

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
    res.status(405);
    message = 'unsupported http method';
  } else {
    res.status(500);
    message = 'server side error of unknown type';
  }

  return res // .status(error.statusCode)
  .json({
    message: message
  }); // .json({ message: error.toString() });
}); // export default { app };

module.exports = app;