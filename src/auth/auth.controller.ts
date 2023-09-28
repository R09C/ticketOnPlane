import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller";
import { IAuthController } from "./interface/auth.controller.intreface";
import { TYPES } from "../TYPES";
import { IAuthService } from "./interface/auth.service.interface";
import { UserRegisterDto } from "./dtos/user.register.dto";
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from "../erors/http-error.class";
import { JwtVerifyDto } from "./dtos/jwt.verify.dto";
import { ValidadteMiddleware } from "../middlewares/validate.middleware";
@injectable()
export class AuthController extends BaseController implements IAuthController{
    constructor(@inject(TYPES.AuthService) private authService:IAuthService){
        super();
        this.bindRoutes([
            {
                path:'/register',
                func:this.register,
                method:'post',
                middlewares:[new ValidadteMiddleware(UserRegisterDto)],
            },
            {
                path:'/login',
                func:this.login,
                method:'post',
                middlewares:[new ValidadteMiddleware(UserRegisterDto)],
            },
            {
                path:'/verifyToken',
                func:this.verifyToken,
                method:'post',
            }
        ]);
    }
    async login({body}:Request<{},{},UserRegisterDto>,res:Response,next:NextFunction):Promise<void>{
        try{
            const token=await this.authService.login(body);
            this.ok(res,token);
        }catch(e){
            return next(e);
        }

    }
    async register({body}:Request<{},{},UserRegisterDto>,res:Response,next:NextFunction):Promise<void>{
        try{
            const user=await this.authService.register(body);
            if(!user) return next(new HTTPError(422,`пользователь уже зареган`));
            this.ok(res,user);
        }catch(e){
            return next(e);
        }

    }
    async verifyToken({body}:Request<{},{},JwtVerifyDto>,res:Response,next:NextFunction):Promise<void>{
        try{
            console.log(body.token)
            this.ok(res,this.authService.verifyToken(body.token))
        }catch(e){
            return next(e);
        }

    }
    
}