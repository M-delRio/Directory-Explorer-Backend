const fs = require('fs');
const path = require('path');

// currentFile = {
//   name: file,
//   size: fileStat.size,
//   lastModifiedMs: fileStat.mtimeMs,
//   lastModifiedDate: fileStat.mtime
// }

const fileSizeCompare = ((a, b) => {
  return (a.size - b.size);
});

const folderTotalFileSize = (files => {
  return (
    files.reduce((sum, file) => {
      return sum + file.size;
    }, 0)
  );
});

const probeDir = ((dir, sourceFolderData = []) => {
  const files = fs.readdirSync(dir);

  //object representing current dir/subdir
  const folderData = {
    name: dir,
    files: [],
    fileCount: 0,
    totalFileSize: 0
  }

  let currentFile;

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const fileStat = fs.lstatSync(filePath);

    if (fileStat.isDirectory()) {
      // sourceFolderData.push(folderData);
      probeDir(filePath, sourceFolderData);
    } else {
      // object representing current file
      currentFile = {
        name: file,
        size: fileStat.size,
        lastModifiedMs: fileStat.mtimeMs,
        lastModifiedDate: fileStat.mtime
      }

      // add file to current dir file list
      folderData.files.push(currentFile);
    }
  });

  // add file count folder metadata
  folderData.fileCount = folderData.files.length;

  // add file size folder metadata
  folderData.totalFileSize = folderTotalFileSize(folderData.files);

  // sort files by size
  folderData.files =
    folderData.files.sort(fileSizeCompare);

  sourceFolderData.push(folderData);

  return sourceFolderData;
});

let results = probeDir('./');

const folderSizeCompare = ((a, b) => {
  return (a.totalFileSize - b.totalFileSize);
});

// sort dirs by total size of files within each dir
results = results.sort(folderSizeCompare);

//log results
// console.log(results);

// results.forEach(folder => {
//   folder.files.forEach(file => {
//     console.log(file);

//   })

return results;
});