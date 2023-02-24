import { Schema, model } from "mongoose";
import IUtcak from "./utcak.interface";
// https://mongoosejs.com/docs/typescript.html
// https://mongoosejs.com/docs/validation.html

const UtcakSchema = new Schema<IUtcak>(
    {
        _id: Schema.Types.ObjectId,
        adoszam: {
            type: Number,
            required: true,
            min: [10000, "Az adószám öt jegyű!"],
            max: [99999, "Az adószám öt jegyű!"],
        },
        utca: {
            type: String,
            required: true,
        },
        hazszam: {
            type: String,
            required: true,
            validate: {
                validator: function (v: string) {
                    return /^\d/.test(v);
                },
                message: "A házszámnak számjeggyel kell kezdődni!",
            },
        },
        adosav_id: {
            ref: "Adosavok",
            type: Schema.Types.ObjectId,
            required: true,
        },
        terulet: {
            type: Number,
            required: true,
            min: [1, "A terület nem lehet nulla vagy negatív érték!"],
        },
    },
    { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

UtcakSchema.virtual("adosav", {
    ref: "Adosavok",
    localField: "adosav_id",
    foreignField: "_id", //ref_Field
    justOne: true,
});

const utcakModel = model("Utcak", UtcakSchema, "utcak");

export default utcakModel;
