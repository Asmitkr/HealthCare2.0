import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getDoctors } from "../controller/getDoctors.controller.js";

const router = express.Router();

router.get("/", isAuth, getDoctors);

export default router;
