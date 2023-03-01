import { IsMongoId, IsOptional, IsString } from "class-validator";
import { Schema } from "mongoose";

import IAddress from "./address.interface";

export default class CreateAddressDto implements IAddress {
    @IsMongoId()
    @IsOptional()
    public _id: Schema.Types.ObjectId;

    @IsString()
    public street: string;

    @IsString()
    public city: string;

    @IsString()
    public country: string;
}
