import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from '@clerk/express';
import fileUpload from "express-fileupload";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from './routes/authRoutes.js';
import adminRoutes from "./routes/adminRoutes.js";
import songsRoutes from "./routes/songsRoutes.js";
import albumsRoutes from "./routes/albumnRoutes.js";
import statusRoutes from "./routes/statusRoutes.js";
import path from "path";

import { connectDB } from "./lib/db.js";

dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // to parse req.body

app.use(clerkMiddleware()); // this will add auth to req body => req.user

app.use(fileUpload(
    {
        useTempFiles : true,
        tempFileDir : path.join(__dirname,"tmp"),
        createParentPath : true,
        limits : {
            fileSize : 10 * 1024 * 1024, // 10mb file size
        }
    }
)); 

app.use("/api/users", userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/songs",songsRoutes);
app.use("/api/albums",albumsRoutes);
app.use("/api/status",statusRoutes);

//error handler
app.use((err,req,res,next)=>{
    res.status(500).json({message : process.env.NODE_ENV==="production" ? "Internal Server Error" : err.message});
})


app.listen(PORT,()=>{
    console.log("Server is running on Port "+ PORT);
    connectDB();
})

//todo : socket.io  -> handle the real time features!