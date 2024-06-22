import express from "express";
// import { signupUser, signinUser, logoutUser } from "../controller/auth.controller.User.js";
// import { signupDr, signinDr, logoutDr } from "../controller/auth.controller.doctor.js";
import {
  signupComp,
  signinComp,
  logoutComp,
} from "../controller/auth.controller.company.js";

import {
  signupDoc,
  signinDoc,
  logoutDoc,
} from "../controller/auth.controller.doctor.js";

import {
  signupUser,
  signinUser,
  logoutUser,
} from "../controller/auth.controller.user.js";

const router = express.Router();

router.get("/signupComp", (req, res) => {
  res.send("helll");
});

router.post("/signupUser", signupUser);
router.post("/signupDoc", signupDoc);
router.post("/signupComp", signupComp);

router.post("/signinUser", signinUser);
router.post("/signinDoc", signinDoc);
router.post("/signinComp", signinComp);

router.post("/logoutUser", logoutUser);
router.post("/logoutDoc", logoutDoc);
router.post("/logoutComp", logoutComp);
export default router;
