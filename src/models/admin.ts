import { InferSchemaType, Schema, model, models } from "mongoose";

const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export type AdminProps = InferSchemaType<typeof adminSchema>;

export const Admin = models.Admin || model<AdminProps>("Admin", adminSchema);
