import { inject, injectable } from "inversify";
import { IMiddleware } from "../common/Middleware.interface";
import { TYPES } from "../TYPES";
import { IConfigService } from "../config/config.service.interface";
import { Request, Response, NextFunction } from "express";
import 'reflect-metadata'
import { verify } from "jsonwebtoken";
import { HTTPError } from "../erors/http-error.class";
import { AuthJwtPayload } from "../auth/dtos/auth.jwt.payload";




@injectable()
export class AuthMiddleware implements IMiddleware{
constructor(@inject(TYPES.ConfigService) private readonly configService:IConfigService){}

execute(req: Request, res: Response, next: NextFunction):void{
    const bearer=req.headers.authorization?.split(' ')[0];
    const token=req.headers.authorization?.split(' ')[1];
    if (bearer == 'Bearer' && token){
        verify(token,this.configService.get('SECRET_KEY'),(err,payload)=>{
            if(err){
                next(new HTTPError(401,'не авторизован'));
            }else if(typeof payload=='object'){
                req.user=payload as AuthJwtPayload;
                next();
            }
        });
    }else{
        next(new HTTPError(401,'не авторизован'));
    }
}

}