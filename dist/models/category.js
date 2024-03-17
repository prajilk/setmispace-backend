"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    label: String,
    value: String,
});
exports.Category = mongoose_1.models.Category || (0, mongoose_1.model)("Category", categorySchema);
//# sourceMappingURL=category.js.map