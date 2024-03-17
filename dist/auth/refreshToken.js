"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const refreshToken = (req, res, next, callback) => {
    if (req.cookies.refreshToken) {
        const refreshToken = req.cookies.refreshToken;
        // Verify refresh token
        try {
            const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            if (typeof decoded === "string") {
                throw new Error();
            }
            const admin = Object.assign({}, decoded);
            delete admin.iat;
            delete admin.exp;
            // Generate new access token (expires in 10 minutes)
            const accessToken = jsonwebtoken_1.default.sign(admin, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
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
        }
        catch (err) {
            res.clearCookie("refreshToken");
            res.clearCookie("accessToken");
            return res
                .status(401)
                .json({ data: "Refresh token is invalid", error: true });
        }
    }
    else {
        return res
            .status(401)
            .json({ data: "Cookie doesn't have REFRESH Token", error: true });
    }
};
exports.refreshToken = refreshToken;
//# sourceMappingURL=refreshToken.js.map