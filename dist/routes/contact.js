"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controllers_1 = require("../controllers");
router.post("/", controllers_1.contactController.handleNewContact);
module.exports = router;
//# sourceMappingURL=contact.js.map