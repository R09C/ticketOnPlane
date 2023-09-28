import { User } from "@prisma/client";
import { UserRegisterDto } from "../dtos/user.register.dto";


export interface IAuthService{
    login:(userRegisterDto:UserRegisterDto)=>Promise<{token:string,user:Omit<User,'password'|'role'>|null}|null>;
    register:(userRegisterDto:UserRegisterDto)=>Promise<User|null>;
    verifyToken:(token:string)=>boolean;

}