import { model, Schema } from "mongoose";

import IAddress from "./address.interface";
import IUser from "./user.interface";

const addressSchema = new Schema<IAddress>(
    {
        city: String,
        country: String,
        street: String,
    },
    { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

const userSchema = new Schema<IUser>(
    {
        address: addressSchema,
        email: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
        },
        password: String,
        auto_login: Boolean,
    },
    { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

const userModel = model<IUser>("User", userSchema, "users");

export default userModel;
