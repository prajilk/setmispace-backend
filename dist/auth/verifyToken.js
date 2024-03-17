"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const refreshToken_1 = require("./refreshToken");
const controllers_1 = require("../controllers");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyToken = (req, res, next) => {
    var _a, _b;
    if (((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken) || ((_b = req.cookies) === null || _b === void 0 ? void 0 : _b.refreshToken)) {
        // Check if access token is present in header or cookies
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res
                .status(401)
                .send({ data: "Access token is missing", error: true });
        }
        // Verify access token
        try {
            const decoded = jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            if (typeof decoded === "string") {
                throw new Error();
            }
            controllers_1.adminController
                .handleGetAdmin(decoded.admin_id)
                .then((adminDetails) => {
                // Do something with the admin ID (e.g., fetch admin data from database)
                return res
                    .status(200)
                    .json({ admin: adminDetails._doc, error: false }); // Return protected data
            })
                .catch((err) => {
                if (err.status_code === 401)
                    res.status(401).json(err);
                else
                    res.status(500).json(err);
            });
        }
        catch (err) {
            // Refresh the ACCESS Token using REFRESH Token
            return (0, refreshToken_1.refreshToken)(req, res, next, exports.verifyToken);
        }
    }
    else {
        return res
            .status(401)
            .send({ data: "Cookie is not received", error: true });
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyToken.js.map