"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSocials = void 0;
function makeSocials(data) {
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
exports.makeSocials = makeSocials;
//# sourceMappingURL=utils.js.map