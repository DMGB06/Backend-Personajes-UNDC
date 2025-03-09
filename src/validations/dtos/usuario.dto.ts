import { Type } from "class-transformer";
import { IsEmail, IsNegative, IsNumber, IsPositive, IsString } from "class-validator";
// import { number } from "joi";

export class CrearUsuarioDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    nombres: string;
}

export class ModificarUsuarioDto {

    @IsNumber()
    @IsPositive()
    id: number;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    nombres: string;
}

export class GetUsuarioDto {
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    id: number;
}