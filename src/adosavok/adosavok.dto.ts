import { IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
import { Schema } from "mongoose";

export default class CreateUtcakDto {
    @IsMongoId()
    @IsOptional()
    public _id: Schema.Types.ObjectId;

    @IsString()
    public sav: number;

    @IsNumber()
    public ado: number;

    @IsNumber()
    public hatar: number;
}
