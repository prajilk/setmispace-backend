import {
    handleGetAllBusinesses,
    handleGetLatestBusinesses,
    handleGetAllFeatures,
    handleCreateBusiness,
    handleGetBusiness,
    handleGetAllCategories,
} from "./business";
import { handleGetHotSellingBusinesses } from "./hot-selling";
import { handleNewContact } from "./contact";
import { handleGetAdmin, handleLogin, handleLogout } from "./admin";

const businessController = {
    handleGetAllBusinesses,
    handleGetLatestBusinesses,
    handleGetBusiness,
    handleGetAllFeatures,
    handleCreateBusiness,
    handleGetAllCategories,
};
const hotSellingController = {
    handleGetHotSellingBusinesses,
};
const contactController = {
    handleNewContact,
};
const adminController = {
    handleGetAdmin,
    handleLogin,
    handleLogout,
};

export {
    businessController,
    hotSellingController,
    contactController,
    adminController,
};
