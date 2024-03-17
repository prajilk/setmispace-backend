"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controllers_1 = require("../controllers");
router.get("/", controllers_1.hotSellingController.handleGetHotSellingBusinesses);
module.exports = router;
//# sourceMappingURL=hot-selling.js.map