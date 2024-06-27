import express from "express";
import isAuth from "../middleware/isAuth.js";

import {
  ApplyInsurance,
  CurrentInsurance,
  ReplyInsurance,
  CompanyInsurance,
} from "../controller/insurance.controller.js";
import {
  AddPlan,
  SearchPlan,
} from "../controller/insurancePlans.controller.js";

const router = express.Router();

router.post("/ApplyInsurance", [isAuth], ApplyInsurance);
router.get("/CurrentInsurance", [isAuth], CurrentInsurance);
router.post("/ReplyInsurance", [isAuth], ReplyInsurance);
router.post("/CompanyInsurance", [isAuth], CompanyInsurance);

router.post("/AddPlan", [isAuth], AddPlan);
router.post("/SearchPlan", [isAuth], SearchPlan);

export default router;
