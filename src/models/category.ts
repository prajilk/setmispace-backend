import { InferSchemaType, Schema, model, models } from "mongoose";

const categorySchema = new Schema({
    label: String,
    value: String,
});

export type CategoryProps = InferSchemaType<typeof categorySchema>;

export const Category =
    models.Category || model<CategoryProps>("Category", categorySchema);
