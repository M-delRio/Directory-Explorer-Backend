import { Router } from "express";

const router = Router();

const getFolderContent = async (req, response, next) => {
  console.log('in');
}



router.get("/", getFolderContent);

export default router;