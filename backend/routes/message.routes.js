import express from "express";
import {sendmessage ,getmessage} from "../controller/message.controller.js"
import isAuth from "../middleware/isAuth.js"
const router = express.Router();

router.get("/:id",isAuth,getmessage);
router.post("/send/:id",isAuth,sendmessage);

export default router;