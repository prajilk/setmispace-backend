"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const mongoose_1 = require("mongoose");
const contactSchema = new mongoose_1.Schema({
    firstName: String,
    lastName: String,
    businessName: String,
    businessType: String,
    phone: String,
    email: String,
    comments: String,
}, { timestamps: true });
exports.Contact = mongoose_1.models.Contact || (0, mongoose_1.model)("Contact", contactSchema);
//# sourceMappingURL=contact.js.map