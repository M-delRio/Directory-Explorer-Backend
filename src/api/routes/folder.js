import { Router } from "express";
import getFolderContent from "../../services/driver"

const router = Router();

const handleGetFolderContent = async (req, res, next) => {
  // add helper function for input validation

  console.log(req.query.path);

  const params = req.query;
  const queryPath = params.path;
  let data;

  try {
    data = await getFolderContent(queryPath);
  } catch (error) {
    console.log("in handleGet catch");

    next(error)
    return
  }

  console.log("in handleGet post catch");


  const responseObj = {
    "message": "Folder content successfully retrieved",
    "data": data
  }

  res.setHeader('Content-Type', 'application/json');
  const parsedResponse = (JSON.stringify(responseObj, null, 4))
  res.send(parsedResponse);

  // if (error.code === "ENOENT") {
  //   message = "Folder not found!";
  //   res.status(422);
  // } else {
  //   message = "An error of an unknown type occured while trying to access this folder";
  //   res.status(500);
  // }



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