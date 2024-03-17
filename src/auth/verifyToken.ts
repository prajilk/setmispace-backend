import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { refreshToken } from "./refreshToken";
import { adminController } from "../controllers";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.cookies?.accessToken || req.cookies?.refreshToken) {
        // Check if access token is present in header or cookies
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res
                .status(401)
                .send({ data: "Access token is missing", error: true });
        }

        // Verify access token
        try {
            const decoded = jwt.verify(
                accessToken,
                process.env.ACCESS_TOKEN_SECRET!
            );

            if (typeof decoded === "string") {
                throw new Error();
            }

            adminController
                .handleGetAdmin(decoded.admin_id)
                .then((adminDetails: { _doc: string }) => {
                    // Do something with the admin ID (e.g., fetch admin data from database)
                    return res
                        .status(200)
                        .json({ admin: adminDetails._doc, error: false }); // Return protected data
                })
                .catch((err: any) => {
                    if (err.status_code === 401) res.status(401).json(err);
                    else res.status(500).json(err);
                });
        } catch (err) {
            // Refresh the ACCESS Token using REFRESH Token
            return refreshToken(req, res, next, verifyToken);
        }
    } else {
        return res
            .status(401)
            .send({ data: "Cookie is not received", error: true });
    }
};
