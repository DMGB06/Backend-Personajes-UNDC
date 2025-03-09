import { Type } from "class-transformer";
import { IsEmail, IsOptional, IsNumber, IsPositive, IsString ,  ValidateIf } from "class-validator";

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
    @Type(() => Number)
    id: number;

    @IsOptional()
    @IsEmail({}, { message: "El email debe ser válido" }) // Mensaje personalizado
    email?: string;
    
    @IsOptional()
    @IsString({ message: "El nombre debe ser un texto válido" })
    nombres?: string;

    @IsOptional()
    @IsString({ message: "El rol debe ser un texto válido" })
    rol?: string;

    @IsOptional()
    @ValidateIf((o) => o.password !== undefined)
    @IsString({ message: "La contraseña debe ser un texto válido" })
    password?: string;
}


export class GetUsuarioDto {
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    id: number;
}
