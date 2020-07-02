import { Router } from "express";
import getFolderContent from "../../services/getFolderContent"
import validateInput from "../../services/validateInput"

const router = Router();

const handleGetFolderContent = async (req, res, next) => {
  console.log(req.query.path);

  let queryPath = req.query.path;

  try {
    queryPath = await validateInput(queryPath);
  } catch (error) {
    console.log('here');
    console.log(error.code);

    next(error)
    return
  }

  // console.log(queryPath);

  try {
    data = await getFolderContent(queryPath);
  } catch (error) {
    next(error)
    return
  }

  // console.log("in handleGet post catch");

  const responseObj = {
    "message": "Folder content successfully retrieved",
    "data": data
  }

  res.setHeader('Content-Type', 'application/json');
  const parsedResponse = (JSON.stringify(responseObj, null, 4))
  res.send(parsedResponse);
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