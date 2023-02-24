import { SchemaTypes } from "mongoose";
// https://mongoosejs.com/docs/validation.html#built-in-validators

import { Schema, model } from "mongoose";
import IAdosavok from "./adosavok.interface";

const AdosavokSchema = new Schema<IAdosavok>(
    {
        _id: SchemaTypes.ObjectId,
        sav: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 1,
            maxlength: 1,
        },
        ado: {
            type: Number,
            required: true,
        },
        hatar: {
            type: Number,
            required: true,
        },
    },
    { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

AdosavokSchema.virtual("utcak", {
    ref: "Utcak",
    localField: "_id",
    foreignField: "adosav_id", // ref_Field
    justOne: false,
});

const adosavokModel = model("Adosavok", AdosavokSchema, "adosavok");

export default adosavokModel;
