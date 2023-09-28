import { Router,Request, Response, NextFunction } from "express";

export interface IPassageController{
    router:Router;
    getAllPassage:(req:Request,res:Response,next:NextFunction)=>Promise<void>;
    changePassage:(req:Request,res:Response,next:NextFunction)=>Promise<void>;
    createPassage:(req:Request,res:Response,next:NextFunction)=>Promise<void>;
    getPassageInfo:(req:Request,res:Response,next:NextFunction)=>Promise<void>;
}