import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";

export async function upload(image: string, filename: string) {
    try {
        const storageRef = ref(storage, filename);
        await uploadString(storageRef, image, "data_url");
        const url = await getDownloadURL(storageRef);
        return url;
    } catch (error) {
        return null;
    }
}
