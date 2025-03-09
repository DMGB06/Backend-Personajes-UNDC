import { Type } from "class-transformer";
import { IsString, IsNumber, IsOptional, IsPositive, isPositive } from "class-validator";

export class CreatePersonajeDto {
  @IsString()
  nombre: string;

  @IsString()
  foto: string;

  @IsNumber()
  idUsuario: number;
}

export class UpdatePersonajeDto {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  foto?: string;

  @IsNumber()
  @IsPositive()
  idUsuario: number;
}

export class GetPersonajeDto {
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  id: number;
}