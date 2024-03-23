import { getStorage, ref, listAll, deleteObject } from "firebase/storage";

// Initialize Firebase Storage
const storage = getStorage();

export async function deleteFilesInFolder(folderPath: string) {
    try {
        // Create a reference to the folder
        const folderRef = ref(storage, folderPath);

        // List all items (files and folders) in the folder
        const { items } = await listAll(folderRef);

        // Delete each item (file or folder) in the folder
        await Promise.all(
            items.map(async (item) => {
                // Delete file
                await deleteObject(item);
            })
        );

        // Check if there's a "gallery" subfolder
        const galleryFolderRef = ref(storage, `${folderPath}/gallery`);
        const { items: galleryItems } = await listAll(galleryFolderRef);

        // If the "gallery" subfolder contains items, recursively delete its contents
        if (galleryItems.length > 0) {
            await deleteFilesInFolder(`${folderPath}/gallery`);
        }

        return true;
    } catch (error) {
        return null;
    }
}
