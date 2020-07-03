const express = require("express");
const Router = express.Router;

const getFolderContent = require("../../services/getFolderContent");
const validateInput = require("../../services/validateInput");

// import getFolderContent from "../../services/getFolderContent"
// import validateInput from "../../services/validateInput"

const router = Router();

const handleGetFolderContent = async (req, res, next) => {
  let queryPath = req.query.path || "";

  try {
    await validateInput(queryPath);
  } catch (error) {
    next(error)
    return
  }

  let data;

  try {
    data = await getFolderContent(queryPath);
  } catch (error) {
    next(error)
    return
  }

  const responseObj = {
    "message": "Folder content successfully retrieved",
    "data": data
  }

  res.setHeader('Content-Type', 'application/json');
  const parsedResponse = (JSON.stringify(responseObj, null, 4))
  res.send(parsedResponse);
}

router.get("/", handleGetFolderContent);

module.exports = router;

// export default router;

