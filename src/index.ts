import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;

import { adminRouter } from "./routes";
import { businessRouter } from "./routes";
import { hotSellingRouter } from "./routes";
import { contactRouter } from "./routes";

//Connect to database
import "./config/db";

const app = express();

app.use(express.json({ limit: "200mb" }));
app.use(cookieParser());
app.use(
    cors({
        origin: [
            "https://setmispace.vercel.app",
            "https://admin-setmispace.vercel.app",
        ],
        // origin: [
        //     "http://localhost:3000",
        //     "http://localhost:5173",
        //     "https://setmispace.vercel.app",
        //     "https://admin-setmispace.vercel.app",
        // ],
        credentials: true,
    })
);

app.use("/api/admin", adminRouter);
app.use("/api/business", businessRouter);
app.use("/api/hot-selling", hotSellingRouter);
app.use("/api/contact", contactRouter);

app.get("/", (req, res) => {
    res.send("Server created successfully!");
});

app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`));
