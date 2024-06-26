import express from "express";
//import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authroutes from "./routes/auth.routes.js";
import insuroutes from "./routes/insurance.routes.js";
import appointmentroutes from "./routes/appointment.routes.js";
import doctorsroutes from "./routes/doctors.routes.js";

import connectToMongoDB from "./db/connectToMongodb.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authroutes);
app.use("/api/insurance", insuroutes);
app.use("/api/appointment", appointmentroutes);
app.use("/api/doctors", doctorsroutes);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToMongoDB();
  console.log(`Server started at port no. : ${PORT}`);
});
