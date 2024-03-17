"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const controllers_1 = require("../controllers");
const createTokens = (req, res) => {
    controllers_1.adminController
        .handleLogin(req)
        .then((validAdmin) => {
        // Generate access token (expires in 15 minutes)
        const accessToken = jsonwebtoken_1.default.sign({ admin_id: validAdmin._id.toString() }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
        // Generate refresh token (expires in 3 days)
        const refreshToken = jsonwebtoken_1.default.sign({ admin_id: validAdmin._id.toString() }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "3d" });
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
exports.createTokens = createTokens;
//# sourceMappingURL=createToken.js.map