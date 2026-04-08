import { IsEmail, IsString, IsUUID } from "class-validator"

export class CreateRequest {
    @IsString()
    @IsUUID(4)
    public readonly userId: string
    @IsString()
    public readonly name: string
    @IsEmail()
    public readonly email: string
    @IsString()
    public readonly password: string
}