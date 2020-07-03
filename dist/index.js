"use strict";

var _server = _interopRequireDefault(require("./server.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const app = require('./server.js')
_server.default.app.listen(process.env.PORT);