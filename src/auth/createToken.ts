import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { adminController } from "../controllers";
import { AdminProps } from "../models/admin";

export const createTokens = (req: Request, res: Response) => {
    adminController
        .handleLogin(req)
        .then((validAdmin: AdminProps & { _id: string }) => {
            // Generate access token (expires in 15 minutes)
            const accessToken = jwt.sign(
                { admin_id: validAdmin._id.toString() },
                process.env.ACCESS_TOKEN_SECRET!,
                { expiresIn: "15m" }
            );

            // Generate refresh token (expires in 3 days)
            const refreshToken = jwt.sign(
                { admin_id: validAdmin._id.toString() },
                process.env.REFRESH_TOKEN_SECRET!,
                { expiresIn: "3d" }
            );

            // Set refresh token in cookie
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 259200000, // 3 Days
            });

            // Set access token in cookie
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 259200000, // 3 Days
            });

            res.status(200).json({ login: "Success" });
        })
        .catch((err) => {
            return res.status(401).json({ login: "Failed", error: err });
        });
};
