import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getUsers } from "../controller/getUsers.controller.js";

const router = express.Router();

router.get("/", isAuth, getUsers);

export default router;
