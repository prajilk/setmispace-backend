"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = exports.contactController = exports.hotSellingController = exports.businessController = void 0;
const business_1 = require("./business");
const hot_selling_1 = require("./hot-selling");
const contact_1 = require("./contact");
const admin_1 = require("./admin");
const businessController = {
    handleGetAllBusinesses: business_1.handleGetAllBusinesses,
    handleGetLatestBusinesses: business_1.handleGetLatestBusinesses,
    handleGetBusiness: business_1.handleGetBusiness,
    handleGetAllFeatures: business_1.handleGetAllFeatures,
    handleCreateBusiness: business_1.handleCreateBusiness,
    handleGetAllCategories: business_1.handleGetAllCategories,
};
exports.businessController = businessController;
const hotSellingController = {
    handleGetHotSellingBusinesses: hot_selling_1.handleGetHotSellingBusinesses,
};
exports.hotSellingController = hotSellingController;
const contactController = {
    handleNewContact: contact_1.handleNewContact,
};
exports.contactController = contactController;
const adminController = {
    handleGetAdmin: admin_1.handleGetAdmin,
    handleLogin: admin_1.handleLogin,
    handleLogout: admin_1.handleLogout,
};
exports.adminController = adminController;
//# sourceMappingURL=index.js.map