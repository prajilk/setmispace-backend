import { Images, Listing } from "./types/business";

function makeSocials(data: Listing & { images: Images }) {
    const socials = [];
    if (data.facebook) {
        socials.push({
            platform: "facebook",
            url: data.facebook,
        });
    }
    if (data.twitter) {
        socials.push({
            platform: "twitter",
            url: data.twitter,
        });
    }
    if (data.instagram) {
        socials.push({
            platform: "instagram",
            url: data.instagram,
        });
    }
    if (data.youtube) {
        socials.push({
            platform: "youtube",
            url: data.youtube,
        });
    }

    return socials;
}

export { makeSocials };
