import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getCompanies } from "../controller/getCompanies.controller.js";

const router = express.Router();

router.get("/", isAuth, getCompanies);

export default router;
