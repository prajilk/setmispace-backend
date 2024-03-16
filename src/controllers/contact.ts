import { Request, Response } from "express";
import { Contact } from "../models";
import { ContactData } from "../lib/types/contact";

async function handleNewContact(req: Request, res: Response) {
    try {
        const contactData: ContactData = req.body;
        if (
            !contactData ||
            !contactData.firstName ||
            !contactData.lastName ||
            !contactData.businessName ||
            !contactData.businessType ||
            !contactData.phone ||
            !contactData.email ||
            !contactData.comments
        ) {
            return res
                .status(400)
                .json({ message: "All field are required!", error: true });
        }
        await Contact.create(contactData);
        return res.status(200).json({ message: "Success" });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export { handleNewContact };
