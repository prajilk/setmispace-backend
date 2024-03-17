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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetAllCategories = exports.handleCreateBusiness = exports.handleGetAllFeatures = exports.handleGetBusiness = exports.handleGetLatestBusinesses = exports.handleGetAllBusinesses = void 0;
const models_1 = require("../models");
const features_1 = require("../models/features");
const upload_1 = require("../lib/firebase/upload");
const utils_1 = require("../lib/utils");
function handleGetAllBusinesses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const businesses = yield models_1.Business.find();
            return res.status(200).json({ businesses });
        }
        catch (error) {
            return res.status(500).json({ error });
        }
    });
}
exports.handleGetAllBusinesses = handleGetAllBusinesses;
function handleGetLatestBusinesses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const businesses = yield models_1.Business.find();
            const latestBusinesses = businesses === null || businesses === void 0 ? void 0 : businesses.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
            return res.status(200).json({ businesses: latestBusinesses });
        }
        catch (error) {
            return res.status(500).json({ error });
        }
    });
}
exports.handleGetLatestBusinesses = handleGetLatestBusinesses;
function handleGetBusiness(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const businessId = req.params.id;
            if (!businessId) {
                return res
                    .status(404)
                    .json({ message: "Invalid Business ID", business: null });
            }
            const business = yield models_1.Business.findById(businessId);
            if (!business) {
                return res
                    .status(404)
                    .json({ message: "Invalid Business ID", business: null });
            }
            return res.status(200).json({ business });
        }
        catch (error) {
            return res.status(500).json({ error, business: null });
        }
    });
}
exports.handleGetBusiness = handleGetBusiness;
function handleGetAllFeatures(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const features = yield features_1.Feature.find();
            return res.status(200).json({ features });
        }
        catch (error) {
            return res.status(500).json({ error });
        }
    });
}
exports.handleGetAllFeatures = handleGetAllFeatures;
function handleGetAllCategories(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categories = yield models_1.Category.find();
            return res.status(200).json({ categories });
        }
        catch (error) {
            return res.status(500).json({ error });
        }
    });
}
exports.handleGetAllCategories = handleGetAllCategories;
function handleCreateBusiness(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            if (!data) {
                return res.status(400).send("Invalid data format.");
            }
            const tags = data.tags.replace(/ /g, "").split(",");
            const features = (_a = data.features) === null || _a === void 0 ? void 0 : _a.split(",");
            const businessSlug = data.business.toLowerCase().replace(/ /g, "-");
            // Upload Image to Firebase
            const thumbnailUrl = yield (0, upload_1.upload)(data.images.thumbnail, `businesses/${businessSlug}/` + "thumbnail.jpg");
            if (!thumbnailUrl) {
                return res.status(500).send("Unable to upload image!");
            }
            let logoUrl, featuredUrl, gallery;
            if (data.images.logo) {
                logoUrl = yield (0, upload_1.upload)(data.images.logo, `businesses/${businessSlug}/logo.png`);
            }
            if (data.images.featured) {
                featuredUrl = yield (0, upload_1.upload)(data.images.featured, `businesses/${businessSlug}/featured.jpg`);
            }
            if (data.images.gallery.length > 0) {
                gallery = yield Promise.all(data.images.gallery.map((image, index) => __awaiter(this, void 0, void 0, function* () {
                    return yield (0, upload_1.upload)(image, `businesses/${businessSlug}/gallery/gallery-img${index + 1}.jpg`);
                })));
            }
            let listingData = {
                business: data.business,
                description: data.description,
                address: data.address,
                plan: data.plan,
                category: data.category,
                thumbnail: thumbnailUrl,
                tags,
            };
            if (data.plan === "paid") {
                Object.assign(listingData, {
                    phone: data.phone,
                    mail: data.mail,
                    website: data.website,
                    mapLink: data.mapLink,
                    socials: (0, utils_1.makeSocials)(data),
                    logo: logoUrl,
                    featured: featuredUrl,
                    gallery,
                    features,
                });
            }
            yield models_1.Business.create(listingData);
            return res.status(201).json({ status: "ok" });
        }
        catch (error) {
            res.status(500).json({
                message: "Something went wrong",
                error: error.message,
            });
        }
    });
}
exports.handleCreateBusiness = handleCreateBusiness;
//# sourceMappingURL=business.js.map