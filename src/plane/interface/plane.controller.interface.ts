import {Request,Response,NextFunction, Router} from 'express';


export interface IPlaneController{
    router:Router;
    getAllPlane:(req:Request,res:Response,next:NextFunction)=>Promise<void>;
    getPlaneinfo:(req:Request,res:Response,next:NextFunction)=>Promise<void>;
    createPlane:(req:Request,res:Response,next:NextFunction)=>Promise<void>;
    updatePlane:(req:Request,res:Response,next:NextFunction)=>Promise<void>;
}