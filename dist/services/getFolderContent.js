"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const fs = require('fs');

const path = require('path');

const fileSizeCompare = (a, b) => {
  return a.size - b.size;
};

const folderTotalFileSize = files => {
  return files.reduce((sum, file) => {
    return sum + file.size;
  }, 0);
};

const getFolderContent = relativeQueryPath => {
  // construct absolute path from home dir
  const baseFolder = require('os').homedir();

  const absoluteQueryPath = path.join(baseFolder, relativeQueryPath);
  console.log(absoluteQueryPath);
  let files; // does the folder exist?

  try {
    files = fs.readdirSync(absoluteQueryPath);
  } catch (error) {
    throw error;
  }

  const folderData = {
    sourceFolder: absoluteQueryPath,
    // sourceFolder: relativeQueryPath,
    files: [],
    subFolders: [],
    fileCount: 0,
    totalFileSize: 0
  };
  let currentFile; // iterate each item (file or subdir within folder)

  files.forEach(item => {
    const filePath = path.join(absoluteQueryPath, item); // const filePath = path.join(absoluteQueryPath, item);

    const fileStat = fs.lstatSync(filePath); // if item is a dir add its name to subFolders list

    if (fileStat.isDirectory()) {
      folderData.subFolders.push(item); // if item is a file create a file object and add it to files list
    } else {
      currentFile = {
        name: item,
        size: fileStat.size,
        lastModifiedMs: fileStat.mtimeMs,
        lastModifiedDate: fileStat.mtime.toString()
      };
      folderData.files.push(currentFile);
    }
  }); // add file count folder metadata

  folderData.fileCount = folderData.files.length; // add file size folder metadata

  folderData.totalFileSize = folderTotalFileSize(folderData.files); // sort files by size

  folderData.files = folderData.files.sort(fileSizeCompare);
  console.log("here");
  console.log(folderData);
  return folderData;
};

var _default = getFolderContent;
exports.default = _default;