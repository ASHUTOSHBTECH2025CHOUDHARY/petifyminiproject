import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { connectdb } from "./databse.js";
import userRoutes from "./routes/UserRoute.js";
import PostRoute from "./routes/PostRoutte.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(cors({
    credentials:true,
    origin: 'http://localhost:3000',
}

));
app.use(cookieParser())
app.use(express.json())
const PORT = 8080;
app.use("/api/v1",userRoutes)
app.use("/api/v2",PostRoute)
connectdb();

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log(`server is running  on port ${PORT}!`));
