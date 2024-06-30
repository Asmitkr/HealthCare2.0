import express from "express";
import isAuth from "../middleware/isAuth.js";

import {
  ScheduleAppointment,
  CurrentAppointments,
} from "../controller/appointment.user.controller.js";

const router = express.Router();

router.post("/ScheduleAppointment", isAuth, ScheduleAppointment);

router.get("/CurrentAppointments", isAuth, CurrentAppointments);

export default router;
