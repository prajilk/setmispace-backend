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
exports.handleNewContact = void 0;
const models_1 = require("../models");
function handleNewContact(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const contactData = req.body;
            if (!contactData ||
                !contactData.firstName ||
                !contactData.lastName ||
                !contactData.businessName ||
                !contactData.businessType ||
                !contactData.phone ||
                !contactData.email ||
                !contactData.comments) {
                return res
                    .status(400)
                    .json({ message: "All field are required!", error: true });
            }
            yield models_1.Contact.create(contactData);
            return res.status(200).json({ message: "Success" });
        }
        catch (error) {
            return res.status(500).json({ error });
        }
    });
}
exports.handleNewContact = handleNewContact;
//# sourceMappingURL=contact.js.map