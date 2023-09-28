import { Request, Response, NextFunction } from "express";

import { IMiddleware } from "../common/Middleware.interface";



export class AuthGvards implements IMiddleware{
    constructor(private readonly role:string){}
    
    execute(req: Request, res: Response, next: NextFunction):void{
        const user=req.user;
        if(user.role==this.role){
            return next();
        }
        res.status(401).send('отказано в доступе');
    }
}