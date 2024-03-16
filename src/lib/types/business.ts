type Images = {
    thumbnail: string;
    featured?: string;
    logo?: string | null;
    gallery: string[];
};

type Listing = {
    plan: string;
    business: string;
    description: string;
    address: string;
    phone?: string;
    mail?: string;
    website?: string;
    mapLink?: string;
    features?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    category: string;
    tags: string;
    featuredImage: string;
};

export { Images, Listing };
