import { Schema } from "mongoose";
export default interface IUtcak {
    _id?: Schema.Types.ObjectId;
    adoszam: number;
    utca: string;
    hazszam: string;
    adosav_id: Schema.Types.ObjectId;
    terulet: number;
}
