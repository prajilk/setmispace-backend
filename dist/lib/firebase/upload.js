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
exports.upload = void 0;
const storage_1 = require("firebase/storage");
const firebase_1 = require("../../config/firebase");
function upload(image, filename) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const storageRef = (0, storage_1.ref)(firebase_1.storage, filename);
            yield (0, storage_1.uploadString)(storageRef, image, "data_url");
            const url = yield (0, storage_1.getDownloadURL)(storageRef);
            return url;
        }
        catch (error) {
            return null;
        }
    });
}
exports.upload = upload;
//# sourceMappingURL=upload.js.map