import { InferSchemaType, Schema, model, models } from "mongoose";

const businessSchema = new Schema(
    {
        plan: {
            type: String,
            required: true,
        },
        business: String,
        description: String,
        address: String,
        phone: String,
        mail: String,
        website: String,
        thumbnail: String,
        featuredImage: String,
        logo: String,
        gallery: [String],
        features: [String],
        mapLink: String,
        socials: [
            {
                platform: String,
                url: String,
            },
        ],
        category: String,
        workingHours: {
            type: Object,
        },
        tags: [String],
    },
    { timestamps: true }
);

type BusinessProps = InferSchemaType<typeof businessSchema>;

export const Business =
    models.Business || model<BusinessProps>("Business", businessSchema);
