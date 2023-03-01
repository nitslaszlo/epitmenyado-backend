import { IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
import { Schema } from "mongoose";

export default class CreateUtcakDto {
    @IsMongoId()
    @IsOptional()
    public _id: Schema.Types.ObjectId;

    @IsNumber()
    public adoszam: number;

    @IsString()
    public utca: string;

    @IsString()
    public hazszam: string;

    @IsNumber()
    public adosav: number;

    @IsNumber()
    public terulet: number;
}
