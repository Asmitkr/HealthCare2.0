import express from "express";
// import { signupUser, signinUser, logoutUser } from "../controller/auth.controller.User.js";
// import { signupDr, signinDr, logoutDr } from "../controller/auth.controller.doctor.js";
import { signupComp, signinComp, logoutComp } from "../controller/auth.controller.company.js";


const router = express.Router();

router.get("/signupComp", (req,res)=>{
    res.send("helll");
})

// router.post("/signupUser", signupUser);

// router.post("/signupDr", signupDr);
router.post("/signupComp", signupComp);

// router.post("/signinUser", signinUser);
// router.post("/signinDr", signinDr);
router.post("/signinComp", signinComp)

// router.post("/logoutUser", logoutUser);
// router.post("/logoutDr", logoutDr);
router.post("/logoutComp", logoutComp);
export default router;