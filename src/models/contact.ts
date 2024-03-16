import { InferSchemaType, Schema, model, models } from "mongoose";

const contactSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        businessName: String,
        businessType: String,
        phone: String,
        email: String,
        comments: String,
    },
    { timestamps: true }
);

type ContactProps = InferSchemaType<typeof contactSchema>;

export const Contact =
    models.Contact || model<ContactProps>("Contact", contactSchema);
