"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = exports.contactRouter = exports.hotSellingRouter = exports.businessRouter = void 0;
const business_1 = __importDefault(require("./business"));
exports.businessRouter = business_1.default;
const hot_selling_1 = __importDefault(require("./hot-selling"));
exports.hotSellingRouter = hot_selling_1.default;
const contact_1 = __importDefault(require("./contact"));
exports.contactRouter = contact_1.default;
const admin_1 = __importDefault(require("./admin"));
exports.adminRouter = admin_1.default;
//# sourceMappingURL=index.js.map