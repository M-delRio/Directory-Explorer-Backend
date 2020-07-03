"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _getFolderContent = _interopRequireDefault(require("../../services/getFolderContent"));

var _validateInput = _interopRequireDefault(require("../../services/validateInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();

const handleGetFolderContent = async (req, res, next) => {
  console.log(req.query.path);
  let queryPath = req.query.path || "";

  try {
    await (0, _validateInput.default)(queryPath);
  } catch (error) {
    console.log(error.code);
    next(error);
    return;
  }

  let data;

  try {
    data = await (0, _getFolderContent.default)(queryPath);
  } catch (error) {
    next(error);
    return;
  }

  const responseObj = {
    "message": "Folder content successfully retrieved",
    "data": data
  };
  res.setHeader('Content-Type', 'application/json');
  const parsedResponse = JSON.stringify(responseObj, null, 4);
  res.send(parsedResponse);
};

router.get("/", handleGetFolderContent);
var _default = router; // currentFile = {
//   name: item,
//   size: fileStat.size,
//   lastModifiedMs: fileStat.mtimeMs,
//   lastModifiedDate: fileStat.mtime.toString()
// }
// const folderData = {
//   name: absoluteQueryPath,
//   // name: relativeQueryPath,
//   files: [],
//   subFolders: [],
//   fileCount: 0,
//   totalFileSize: 0
// }

exports.default = _default;