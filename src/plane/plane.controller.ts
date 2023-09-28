import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller";
import { TYPES } from "../TYPES";
import { NextFunction, Request, Response, Router } from "express";
import 'reflect-metadata';
import { IMiddleware } from "../common/Middleware.interface";
import { HTTPError } from "../erors/http-error.class";
import { AuthGvards } from "../guards/auth.guard";
import { IPlaneController } from "./interface/plane.controller.interface";
import { PlaneM } from "./entities/plane.entity";
import { IPlaneService } from "./interface/plane.service.interface";

@injectable()
export class PlaneController extends BaseController implements IPlaneController{
    constructor(
        @inject(TYPES.PlaneService)private planeService:IPlaneService,
        @inject(TYPES.AuthMiddleware)private authMiddleware:IMiddleware,
        ){
        super();
        this.bindRoutes([
            {
                path:'/create',
                method:'post',
                func:this.createPlane,
                middlewares:[this.authMiddleware,new AuthGvards('ADMIN')]
            },
            {
                path:'/:id',
                method:'get',
                func:this.getPlaneinfo,
                middlewares:[this.authMiddleware,new AuthGvards('ADMIN')]
            },
            {
                path:'/update',
                method:'put',
                func:this.updatePlane,
                middlewares:[this.authMiddleware,new AuthGvards('ADMIN')]
            },
        ]);

        
    }

    async createPlane({body}:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            if(!body) return next(new HTTPError(422,'некорректные данные'));
            const plane=await this.planeService.createPlane(body);
            if(!plane) return next(new HTTPError(422,'некорректные данные'));
            this.ok(res,plane);
        }catch(e){
            return next(e)
        }
    }
    async  getPlaneinfo(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            const id=Number(req.params.id)
            if(!id) return next(new HTTPError(422,'некорректные данные'));
            const plane=await this.planeService.getPlaneById(id);
            if(!plane) return next(new HTTPError(422,'некорректные данные'));
            this.ok(res,plane);
        }catch(e){
            return next(e)
        }
    }
    async getAllPlane(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            const allPlaneId=await this.planeService.getAllPlane();
            this.ok(res,allPlaneId);
        }catch(e){
            return next(e)
        }
    }

    async updatePlane(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            const id=req.body.id;
            const coeff=req.body.coeff;
            if(!id||!coeff) return next(new HTTPError(422,'некорректные данные'));
            const plane=await this.planeService.updatePlane(id,coeff);
            if(!plane) return next(new HTTPError(422,'некорректные данные'));
            this.ok(res,plane);
        }catch(e){
            return next(e)
        }
    }
    

}
