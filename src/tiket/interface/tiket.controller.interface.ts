import { NextFunction, Request, Response,Router } from "express";



export interface ITiketController{
    router:Router;
    buyTiket:(req:Request,res:Response,next:NextFunction)=>Promise<void>;
    getTiketInfo:(req:Request,res:Response,next:NextFunction)=>Promise<void>;
    createTiketGroup:(req:Request,res:Response,next:NextFunction)=>Promise<void>;
    getAllTiketInPas:(req:Request,res:Response,next:NextFunction)=>Promise<void>;

}