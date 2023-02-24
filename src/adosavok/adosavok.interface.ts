import { Schema } from "mongoose";
export default interface IAdosavok {
    _id: Schema.Types.ObjectId;
    sav: string;
    ado: number;
    hatar: number;
}
