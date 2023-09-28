import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller";
import { IPlaceController } from "./interface/place.controller.interface";
import { TYPES } from "../TYPES";
import { IPlaceService } from "./interface/place.service.interface";
import { NextFunction, Request, Response, Router } from "express";
import 'reflect-metadata';
import { IMiddleware } from "../common/Middleware.interface";
import { HTTPError } from "../erors/http-error.class";
import { PlaceM } from "./entities/place.entity";
import { PlaceService } from "./place.service";
import { AuthGvards } from "../guards/auth.guard";

@injectable()
export class PlaceController extends BaseController implements IPlaceController{
    constructor(
        @inject(TYPES.PlaceService)private placeService:IPlaceService,
        @inject(TYPES.AuthMiddleware)private authMiddleware:IMiddleware,
        ){
        super();
        this.bindRoutes([
            {
                path:'/create',
                method:'post',
                func:this.createPlaceGroup,
                middlewares:[this.authMiddleware,new AuthGvards('ADMIN')]
            },
            {
                path:'/:id',
                method:'get',
                func:this.getPlaceGroup,
                middlewares:[this.authMiddleware,new AuthGvards('ADMIN')]
            },
            {
                path:'/:planeId',
                method:'get',
                func:this.getAllInPlane,
                middlewares:[this.authMiddleware,new AuthGvards('ADMIN')]
            },
        ]);

        
    }

    async createPlaceGroup({body}:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            if(!body) return next(new HTTPError(422,'некорректные данные'));
            const PG=await this.placeService.createPlaceGroup(body);
            if(!PG) return next(new HTTPError(422,'некорректные данные'));
            this.ok(res,PG);
        }catch(e){
            return next(e)
        }
    }
    async getPlaceGroup(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            const id=Number(req.params.id)
            if(!id) return next(new HTTPError(422,'некорректные данные'));
            const PG=await this.placeService.getPlaceGroup(id);
            this.ok(res,PG);
        }catch(e){
            return next(e)
        }
    }
    async getAllInPlane(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            const planeId=Number(req.params.planeId)
            if(!planeId) return next(new HTTPError(422,'некорректные данные'));
            const AllPG=await this.placeService.getAllInPlane(planeId);
            this.ok(res,AllPG);
        }catch(e){
            return next(e)
        }
    }

}
