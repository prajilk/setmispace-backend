"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controllers_1 = require("../controllers");
router.get("/", controllers_1.businessController.handleGetAllBusinesses);
router.get("/latest", controllers_1.businessController.handleGetLatestBusinesses);
router.get("/features", controllers_1.businessController.handleGetAllFeatures);
router.get("/categories", controllers_1.businessController.handleGetAllCategories);
router.get("/:id", controllers_1.businessController.handleGetBusiness);
router.post("/new", controllers_1.businessController.handleCreateBusiness);
module.exports = router;
//# sourceMappingURL=business.js.map