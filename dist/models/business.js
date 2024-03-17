"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Business = void 0;
const mongoose_1 = require("mongoose");
const businessSchema = new mongoose_1.Schema({
    plan: {
        type: String,
        required: true,
    },
    business: String,
    description: String,
    address: String,
    phone: String,
    mail: String,
    website: String,
    thumbnail: String,
    featuredImage: String,
    logo: String,
    gallery: [String],
    features: [String],
    mapLink: String,
    socials: [
        {
            platform: String,
            url: String,
        },
    ],
    category: String,
    workingHours: {
        type: Object,
    },
    tags: [String],
}, { timestamps: true });
exports.Business = mongoose_1.models.Business || (0, mongoose_1.model)("Business", businessSchema);
//# sourceMappingURL=business.js.map