import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authroutes from "./routes/auth.routes.js";
import insuroutes from "./routes/insurance.routes.js";
import appointmentroutesUser from "./routes/appointment.user.routes.js";
import appointmentroutesDoctor from "./routes/appointment.doctor.routes.js";
import doctorsroutes from "./routes/doctors.routes.js";
import companiesroutes from "./routes/companies.routes.js";
import insurancePlansroutes from "./routes/insurancePlans.routes.js";
import userroutes from "./routes/user.routes.js";
import messageroutes from "./routes/message.routes.js";

import { app, server } from "./socket/socket.js";

import connectToMongoDB from "./db/connectToMongodb.js";

dotenv.config();
//const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authroutes);
app.use("/api/insurance", insuroutes);
app.use("/api/appointment", appointmentroutesUser);
app.use("/api/appointment", appointmentroutesDoctor);
app.use("/api/doctors", doctorsroutes);
app.use("/api/companies", companiesroutes);
app.use("/api/users", userroutes);
app.use("/api/insurancePlans", insurancePlansroutes);
app.use("/api/messages", messageroutes);

app.use(express.static(path.join(__dirname, "/frontend/healthcare/dist")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "frontend", "healthcare", "dist", "index.html")
  );
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
