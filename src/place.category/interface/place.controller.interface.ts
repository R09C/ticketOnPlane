import { Place_Category } from "@prisma/client";
import { PlaceM } from "../entities/place.entity";
import { NextFunction, Request, Response, Router } from "express";


export interface IPlaceController{
    router:Router;
    createPlaceGroup:(req:Request,res:Response,next:NextFunction)=>Promise<void>;
    getPlaceGroup:(req:Request,res:Response,next:NextFunction)=>Promise<void>;
    getAllInPlane:(req:Request,res:Response,next:NextFunction)=>Promise<void>;
}