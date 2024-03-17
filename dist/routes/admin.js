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
const express_1 = __importDefault(require("express"));
const verifyToken_1 = require("../auth/verifyToken");
const createToken_1 = require("../auth/createToken");
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
// Login route
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, createToken_1.createTokens)(req, res);
}));
router.get("/logout", controllers_1.adminController.handleLogout);
// Verify admin
router.get("/verify", verifyToken_1.verifyToken);
module.exports = router;
//# sourceMappingURL=admin.js.map