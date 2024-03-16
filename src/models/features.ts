import { InferSchemaType, Schema, model, models } from "mongoose";

const featureSchema = new Schema({
    label: String,
    value: String,
    icon: String,
});

export type FeatureProps = InferSchemaType<typeof featureSchema>;

export const Feature =
    models.Feature || model<FeatureProps>("Feature", featureSchema);
