import express from "express";
import isAuth from "../middleware/isAuth.js" 

import {ApplyInsurance,CurrentInsurance,ReplyInsurance} from "../controller/controller.insurance.js";

const router = express.Router();

router.post("/ApplyInsurance",[isAuth], ApplyInsurance);
router.post("/CurrentInsurance",[isAuth],CurrentInsurance);
router.post("/ReplyInsurance",[isAuth],ReplyInsurance);

export default router;