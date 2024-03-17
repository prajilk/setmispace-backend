"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLogout = exports.handleLogin = exports.handleGetAdmin = void 0;
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
function handleLogin(req) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const adminData = req.body;
                const validAdmin = yield models_1.Admin.findOne({
                    email: adminData.email,
                });
                if (validAdmin) {
                    try {
                        if (yield bcrypt_1.default.compare(adminData.password, validAdmin.password)) {
                            resolve(validAdmin);
                        }
                        else {
                            reject({
                                error: true,
                                message: "Invalid admin password",
                            });
                        }
                    }
                    catch (err) {
                        reject({ error: true, message: err.message });
                    }
                }
                else {
                    reject({ error: true, message: "Email not valid" });
                }
            }
            catch (error) {
                if (error.message.endsWith("timed out after 10000ms"))
                    reject({
                        error: true,
                        message: "No internet connection!",
                    });
                reject({ error: true, message: "Something went wrong." });
            }
        }));
    });
}
exports.handleLogin = handleLogin;
function handleGetAdmin(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const validAdmin = yield models_1.Admin.findOne({ _id: id });
            // Remove the password from the validAdmin
            if (validAdmin) {
                const admin = Object.assign({}, validAdmin);
                delete admin._doc.password;
                return admin;
            }
            else {
                return { message: "Unauthorized", status_code: 401 };
            }
        }
        catch (error) {
            return error;
        }
    });
}
exports.handleGetAdmin = handleGetAdmin;
function handleLogout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.clearCookie("accessToken", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            expires: new Date(0),
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            expires: new Date(0),
        });
        res.status(200).json({ data: "Logout out successfully" });
    });
}
exports.handleLogout = handleLogout;
//# sourceMappingURL=admin.js.map