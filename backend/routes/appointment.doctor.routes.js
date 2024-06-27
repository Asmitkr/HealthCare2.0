import express from "express";
import isAuth from "../middleware/isAuth.js" 

import {PendingRequest,UpcomingAppointment,ReplyAppointment,PreviousAppointment} from "../controller/appointment.doctor.controller.js";


const router = express.Router();

router.get("/pendingRequest",isAuth,PendingRequest);
router.post("/ReplyAppointment",isAuth,ReplyAppointment)
router.get("/upcomingAppointment",isAuth,UpcomingAppointment);
router.get("/previousAppointment",isAuth,PreviousAppointment);


export default router;