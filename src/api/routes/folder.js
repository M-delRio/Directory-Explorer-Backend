import { Router } from "express";
import getFolderContent from "../../services/driver"

const router = Router();

const handleGetFolderContent = async (req, res, next) => {
  // add helper function for input validation

  const params = req.body;
  const queryPath = params.path;
  let responseObj;

  try {
    const data = await getFolderContent(queryPath);

    responseObj = {
      "message": "Folder content successfully retrieved",
      "data": data
    }
  } catch (error) {
    let message;

    if (error.code === "ENOENT") {
      message = "Folder not found!";
      res.status(422);
    } else {
      message = "An error of an unknown type occured while trying to access this folder";
      res.status(500);
    }

    responseObj = {
      "message": message
    }
  }

  //   {
  //     "message": "Folder content successfully retrieved",
  //     "data": {
  //         "sourceFolder": "images/company_retreat",
  //         "files": [{fileObject1}, {fileObject2}, {fileObject3}],
  //         "subFolders": ["2020", "2019", "2018"],
  //         "fileCount": 45,
  //         "totalFileSize": 500000000
  //     }
  // }

  res.setHeader('Content-Type', 'application/json');
  const parsedResponse = (JSON.stringify(responseObj, null, 4))
  res.send(parsedResponse);
  // res.json(responseObj);
}

router.get("/", handleGetFolderContent);

export default router;

// currentFile = {
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