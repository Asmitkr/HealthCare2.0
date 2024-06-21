import express from "express";
//import path from "path";
//import cookieParser from "cookie-parser"
import dotenv from "dotenv";

import authroutes from "./routes/auth.routes.js";

import connectToMongoDB from "./db/connectToMongodb.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/auth", authroutes);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToMongoDB();
  console.log(`Server started at port no. : ${PORT}`);
});
