import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getInsurancePlans } from "../controller/getInsurancePlans.controller.js";

const router = express.Router();

router.get("/", isAuth, getInsurancePlans);

export default router;
