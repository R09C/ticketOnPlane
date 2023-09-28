import { IsString,IsEmail} from "class-validator";

export class UserRegisterDto{
    @IsEmail({},{message:'некорректный email'})
    readonly email:string;

    @IsString()
    readonly password:string;
}