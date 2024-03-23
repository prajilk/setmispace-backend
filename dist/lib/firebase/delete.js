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
exports.deleteFilesInFolder = void 0;
const storage_1 = require("firebase/storage");
// Initialize Firebase Storage
const storage = (0, storage_1.getStorage)();
function deleteFilesInFolder(folderPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Create a reference to the folder
            const folderRef = (0, storage_1.ref)(storage, folderPath);
            // List all items (files and folders) in the folder
            const { items } = yield (0, storage_1.listAll)(folderRef);
            // Delete each item (file or folder) in the folder
            yield Promise.all(items.map((item) => __awaiter(this, void 0, void 0, function* () {
                // Delete file
                yield (0, storage_1.deleteObject)(item);
            })));
            // Check if there's a "gallery" subfolder
            const galleryFolderRef = (0, storage_1.ref)(storage, `${folderPath}/gallery`);
            const { items: galleryItems } = yield (0, storage_1.listAll)(galleryFolderRef);
            // If the "gallery" subfolder contains items, recursively delete its contents
            if (galleryItems.length > 0) {
                yield deleteFilesInFolder(`${folderPath}/gallery`);
            }
            return true;
        }
        catch (error) {
            return null;
        }
    });
}
exports.deleteFilesInFolder = deleteFilesInFolder;
//# sourceMappingURL=delete.js.map