import { Request, Response } from "express";
import { Admin } from "../models";
import bcrypt from "bcrypt";
import { AdminProps } from "../models/admin";

async function handleLogin(req: Request) {
    return new Promise<AdminProps & { _id: string }>(
        async (resolve, reject) => {
            try {
                const adminData = req.body;
                const validAdmin: (AdminProps & { _id: string }) | null =
                    await Admin.findOne({
                        email: adminData.email,
                    });
                if (validAdmin) {
                    try {
                        if (
                            await bcrypt.compare(
                                adminData.password,
                                validAdmin.password
                            )
                        ) {
                            resolve(validAdmin);
                        } else {
                            reject({
                                error: true,
                                message: "Invalid admin password",
                            });
                        }
                    } catch (err: any) {
                        reject({ error: true, message: err.message });
                    }
                } else {
                    reject({ error: true, message: "Email not valid" });
                }
            } catch (error: any) {
                if (error.message.endsWith("timed out after 10000ms"))
                    reject({
                        error: true,
                        message: "No internet connection!",
                    });
                reject({ error: true, message: "Something went wrong." });
            }
        }
    );
}
async function handleGetAdmin(id: string) {
    try {
        const validAdmin = await Admin.findOne({ _id: id });
        // Remove the password from the validAdmin
        if (validAdmin) {
            const admin = Object.assign({}, validAdmin);
            delete admin._doc.password;
            return admin;
        } else {
            return { message: "Unauthorized", status_code: 401 };
        }
    } catch (error) {
        return error;
    }
}
async function handleLogout(req: Request, res: Response) {
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
}

export { handleGetAdmin, handleLogin, handleLogout };
