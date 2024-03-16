import { Request, Response } from "express";
import { Business, Category } from "../models";
import { Feature } from "../models/features";
import { upload } from "../lib/firebase/upload";
import { Images, Listing } from "../lib/types/business";
import { makeSocials } from "../lib/utils";

async function handleGetAllBusinesses(req: Request, res: Response) {
    try {
        const businesses = await Business.find();
        return res.status(200).json({ businesses });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

async function handleGetLatestBusinesses(req: Request, res: Response) {
    try {
        const businesses = await Business.find();
        const latestBusinesses = businesses?.sort(
            (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
        );
        return res.status(200).json({ businesses: latestBusinesses });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

async function handleGetBusiness(req: Request, res: Response) {
    try {
        const businessId = req.params.id;
        if (!businessId) {
            return res
                .status(404)
                .json({ message: "Invalid Business ID", business: null });
        }

        const business = await Business.findById(businessId);
        if (!business) {
            return res
                .status(404)
                .json({ message: "Invalid Business ID", business: null });
        }

        return res.status(200).json({ business });
    } catch (error) {
        return res.status(500).json({ error, business: null });
    }
}

async function handleGetAllFeatures(req: Request, res: Response) {
    try {
        const features = await Feature.find();
        return res.status(200).json({ features });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

async function handleGetAllCategories(req: Request, res: Response) {
    try {
        const categories = await Category.find();
        return res.status(200).json({ categories });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

async function handleCreateBusiness(req: Request, res: Response) {
    try {
        const data: Listing & { images: Images } = req.body;
        if (!data) {
            return res.status(400).send("Invalid data format.");
        }

        const tags = data.tags.replace(/ /g, "").split(",");
        const features = data.features?.split(",");

        const businessSlug = data.business.toLowerCase().replace(/ /g, "-");

        // Upload Image to Firebase
        const thumbnailUrl = await upload(
            data.images.thumbnail,
            `businesses/${businessSlug}/` + "thumbnail.jpg"
        );

        if (!thumbnailUrl) {
            return res.status(500).send("Unable to upload image!");
        }

        let logoUrl, featuredUrl, gallery;

        if (data.images.logo) {
            logoUrl = await upload(
                data.images.logo,
                `businesses/${businessSlug}/logo.png`
            );
        }

        if (data.images.featured) {
            featuredUrl = await upload(
                data.images.featured,
                `businesses/${businessSlug}/featured.jpg`
            );
        }

        if (data.images.gallery.length > 0) {
            gallery = await Promise.all(
                data.images.gallery.map(async (image, index) => {
                    return await upload(
                        image,
                        `businesses/${businessSlug}/gallery/gallery-img${
                            index + 1
                        }.jpg`
                    );
                })
            );
        }

        let listingData: any = {
            business: data.business,
            description: data.description,
            address: data.address,
            plan: data.plan,
            category: data.category,
            thumbnail: thumbnailUrl,
            tags,
        };

        if (data.plan === "paid") {
            Object.assign(listingData, {
                phone: data.phone,
                mail: data.mail,
                website: data.website,
                mapLink: data.mapLink,
                socials: makeSocials(data),
                logo: logoUrl,
                featured: featuredUrl,
                gallery,
                features,
            });
        }

        await Business.create(listingData);

        return res.status(201).json({ status: "ok" });
    } catch (error: any) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
}

export {
    handleGetAllBusinesses,
    handleGetLatestBusinesses,
    handleGetBusiness,
    handleGetAllFeatures,
    handleCreateBusiness,
    handleGetAllCategories,
};
