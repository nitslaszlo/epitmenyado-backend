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
        _id: Schema.Types.ObjectId,
        address: addressSchema,
        email: String,
        name: String,
        password: String,
        auto_login: Boolean,
    },
    { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

const userModel = model<IUser>("User", userSchema, "users");

export default userModel;
