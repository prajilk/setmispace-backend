"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feature = void 0;
const mongoose_1 = require("mongoose");
const featureSchema = new mongoose_1.Schema({
    label: String,
    value: String,
    icon: String,
});
exports.Feature = mongoose_1.models.Feature || (0, mongoose_1.model)("Feature", featureSchema);
//# sourceMappingURL=features.js.map