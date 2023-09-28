import { NextFunction, Request, Response, Router } from 'express';


export interface IAuthController{
    router:Router;
    login:(req:Request,res:Response,next:NextFunction)=>Promise<void>;
    register:(req:Request,res:Response,next:NextFunction)=>Promise<void>;
    verifyToken:(req:Request,res:Response,next:NextFunction)=>Promise<void>;
 }