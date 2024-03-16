import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const refreshToken = (
    req: Request,
    res: Response,
    next: NextFunction,
    callback: (req: Request, res: Response, next: NextFunction) => void
) => {
    if (req.cookies.refreshToken) {
        const refreshToken = req.cookies.refreshToken;

        // Verify refresh token
        try {
            const decoded = jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET!
            );

            if (typeof decoded === "string") {
                throw new Error();
            }

            const admin = { ...decoded };
            delete admin.iat;
            delete admin.exp;

            // Generate new access token (expires in 10 minutes)
            const accessToken = jwt.sign(
                admin,
                process.env.ACCESS_TOKEN_SECRET!,
                { expiresIn: "15m" }
            );

            // Set new access token in cookie
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 259200000, // 3 Days
            });

            // Update the accessToken with new accessToken
            req.cookies.accessToken = accessToken;

            // Call the callback function passed through the parameter, to again execute the function after refreshing the token.
            return callback(req, res, next);
        } catch (err) {
            res.clearCookie("refreshToken");
            res.clearCookie("accessToken");
            return res
                .status(401)
                .json({ data: "Refresh token is invalid", error: true });
        }
    } else {
        return res
            .status(401)
            .json({ data: "Cookie doesn't have REFRESH Token", error: true });
    }
};
