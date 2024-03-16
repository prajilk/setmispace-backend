import express from "express";
import { verifyToken } from "../auth/verifyToken";
import { createTokens } from "../auth/createToken";
import { adminController } from "../controllers";
const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
    createTokens(req, res);
});

router.get("/logout", adminController.handleLogout);

// Verify admin
router.get("/verify", verifyToken);

export = router;
