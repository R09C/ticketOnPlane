import { IAuthService } from "./interface/auth.service.interface";
import { User,Role } from "@prisma/client";
import { UserRegisterDto } from "./dtos/user.register.dto";
import { inject, injectable } from "inversify";
import { TYPES } from "../TYPES";
import { IUserRepository } from "../user/interface/user.repository.interface";
import { IConfigService } from "../config/config.service.interface";
import { UserM } from "../user/entities/user.entity";
import { AuthJwtPayload } from "./dtos/auth.jwt.payload";
import { resolve } from "app-root-path";
import 'reflect-metadata';
import { sign, verify } from "jsonwebtoken";



@injectable()
export class AuthService implements IAuthService{

    constructor
    (@inject(TYPES.UserRepository) private userRepository:IUserRepository,
    @inject(TYPES.ConfigService) private configService:IConfigService,
    ){}

    async login({email,password}: UserRegisterDto): Promise <{ token: string; user: Omit<User, "password" | "role"> | null; } | null>{
        const userFromDB=await this.userRepository.getAllUserByEmail(email);
        if(!userFromDB)return null;
        const userEntity=new UserM(
            userFromDB.salt,
            userFromDB.email,
            userFromDB.role,
            userFromDB.password,
        );
        const passwordSync=await userEntity.camparePassword(password);
        if(!passwordSync) return null;
        const token=await this.generateToken(
            {id:userFromDB.id.toString(),salt:userFromDB.salt,email:userFromDB.email,role:userFromDB.role},
            this.configService.get('SECRET_KEY'),
        );
        const user =await this.userRepository.getAllUserByID(userFromDB.id);
        return{token,user};
    }
    async register({email,password}: UserRegisterDto): Promise<User | null>{
        const existeduser=await this.userRepository.getAllUserByEmail(email);
        if(existeduser) return null;
        const userEntity=new UserM(10 ,email,Role.USER);
        const salt=userEntity.salt;
        await userEntity.setPassword(password,Number(salt));
        return this.userRepository.createUser(userEntity)
    }
    verifyToken(token: string):boolean{
        try{
            const decoded=verify(token,this.configService.get('SECRET_KEY'));
            
            return true;
        }catch(e){
            return false;
        }

    }

    private generateToken(payload:AuthJwtPayload,secret:string):Promise<string>{
        return new Promise<string>((resolve,reject)=>{
            sign(payload,secret,{algorithm:'HS256',expiresIn:'1h'},(err,token)=>{
                if(err){
                    reject(err);
                }
                resolve(token as string);
            });
        });
    }

}

