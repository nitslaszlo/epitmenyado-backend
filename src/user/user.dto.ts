import "reflect-metadata";

import { Type } from "class-transformer";
import { IsBoolean, IsMongoId, IsOptional, IsString, ValidateNested } from "class-validator";
import { Schema } from "mongoose";

import CreateAddressDto from "./address.dto";
import IUser from "./user.interface";

export default class CreateUserDto implements IUser {
    @IsMongoId()
    @IsOptional()
    public _id: Schema.Types.ObjectId;

    @IsString()
    public name: string;

    @IsString()
    public email: string;

    @IsString()
    public password: string;

    @IsBoolean()
    public auto_login: boolean;

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateAddressDto)
    public address?: CreateAddressDto;
}
