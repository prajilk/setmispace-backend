import mongoose, { InferSchemaType, Schema, model, models } from "mongoose";

const hotSellingSchema = new Schema({
    businessId: mongoose.Schema.Types.ObjectId,
    business: String,
    title: String,
    image: String,
    long: Boolean,
});

type HotSellingProps = InferSchemaType<typeof hotSellingSchema>;

export const HotSelling =
    models.HotSelling || model<HotSellingProps>("HotSelling", hotSellingSchema);
