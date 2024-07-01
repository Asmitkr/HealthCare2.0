import express from "express";
import isAuth from "../middleware/isAuth.js";

import {
  ApplyInsurance,
  CurrentInsurance,
  ReplyInsurance,
  CompanyInsurance,
  ApplyClaim,
  ReplyClaim,
  pendingInsurance,
} from "../controller/insurance.controller.js";
import {
  AddPlan,
  SearchPlan,
} from "../controller/insurancePlans.controller.js";
import { PendingRequest } from "../controller/appointment.doctor.controller.js";

const router = express.Router();

router.post("/ApplyInsurance", [isAuth], ApplyInsurance);
router.get("/CurrentInsurance", [isAuth], CurrentInsurance);
router.post("/ReplyInsurance", [isAuth], ReplyInsurance);
router.get("/CompanyInsurance", [isAuth], CompanyInsurance);
router.post("/ApplyClaim", [isAuth], ApplyClaim);
router.post("/ReplyClaim", [isAuth], ReplyClaim);
router.get("/PendingInsurance", [isAuth], pendingInsurance);

router.post("/AddPlan", [isAuth], AddPlan);
router.get("/SearchPlan", [isAuth], SearchPlan);

export default router;
