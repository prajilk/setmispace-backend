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
exports.handleGetHotSellingBusinesses = void 0;
const models_1 = require("../models");
function handleGetHotSellingBusinesses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hotSelling = yield models_1.HotSelling.find();
            const ghazalIndex = hotSelling.findIndex((v) => v.business === "Ghazal");
            if (ghazalIndex !== -1) {
                const rearrangedHotSelling = hotSelling.filter((_, index) => index !== ghazalIndex);
                rearrangedHotSelling.splice(1, 0, hotSelling[ghazalIndex]);
                return res.status(200).json({ hotSelling: rearrangedHotSelling });
            }
            return res.status(200).json({ hotSelling: hotSelling });
        }
        catch (error) {
            return res.status(500).json({ error });
        }
    });
}
exports.handleGetHotSellingBusinesses = handleGetHotSellingBusinesses;
//# sourceMappingURL=hot-selling.js.map