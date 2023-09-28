import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller";
import { ITiketController } from "./interface/tiket.controller.interface";
import { TYPES } from "../TYPES";
import { ITiketService } from "./interface/tiket.service.interface";
import { Request, Response, NextFunction } from "express";
import { HTTPError } from "../erors/http-error.class";
import { TiketGroupM } from "./entities/tiketGroup.entity";
import { IPassageService } from "../Passages/interface/passage.service.interface";
import { IMiddleware } from "../common/Middleware.interface";
import { AuthGvards } from "../guards/auth.guard";
import 'reflect-metadata';
import { PassageM } from "../Passages/entities/passage.entity";

injectable()
export class TiketController extends BaseController implements ITiketController{
    constructor(
        @inject(TYPES.TiketService) private tiketService:ITiketService,
        @inject(TYPES.PassageService) private passageService:IPassageService,
        @inject(TYPES.AuthMiddleware) private authMiddleware:IMiddleware,
    ){
        super();

        this.bindRoutes([
            {
                path:'/buy',
                method:'post',
                func:this.buyTiket,
                middlewares:[this.authMiddleware],
                
            },
            {
                path:'/:id',
                method:'get',
                func:this.getTiketInfo,
                middlewares:[this.authMiddleware],
                
            },
            {
                path:'/create',
                method:'post',
                func:this.createTiketGroup,
                middlewares:[this.authMiddleware,new AuthGvards("ADMIN")],
                
            },
            {
                path:'/:pasId',
                method:'get',
                func:this.getAllTiketInPas,
                middlewares:[this.authMiddleware],
                
            },
        ]);
    }

    async buyTiket(req: Request, res: Response, next: NextFunction):Promise<void>{
        try{
            const TiketId=Number(req.body.id);
            const basketId=Number(req.body.basketId);
            if(!TiketId||!basketId){
                return next(new HTTPError(422,'некорректный запрос'))
            }
            const tiket=await this.tiketService.buyTiket(TiketId,basketId);
            this.ok(res,tiket)
        }catch(e){
            return next(e)
        }
    }

    async getTiketInfo(req: Request, res: Response, next: NextFunction):Promise<void>{
        try{
            const tiketId=Number(req.params.id);
            if(!tiketId) return next(new HTTPError(422,'некорректный запрос'))
            const tiket=await this.tiketService.getTiketById(tiketId);
            this.ok(res,tiket)
        }catch(e){
            return next(e)
        }
    }

    async createTiketGroup(req: Request, res: Response, next: NextFunction):Promise<void>{
        try{
            const passageInfo= await this.passageService.GetIdPassage(req.body.entity.passageId);
            const tiketEntity=new TiketGroupM(
                req.body.entity.price,
                req.body.entity.passageId,
            )
            const tiketQuantity=req.body.quantity;
            
            if(!passageInfo||passageInfo.count-tiketQuantity>=0) return next(new HTTPError(422,'некорректный запрос'))
            const tiketGroup= await this.tiketService.createTiketsGroup(tiketQuantity,tiketEntity);
            this.ok(res,tiketGroup)
        }catch(e){
            return next(e)
        }
    }


    async getAllTiketInPas(req: Request, res: Response, next: NextFunction):Promise<void>{
        try{
            const passageId=Number(req.params.pasId);
            const tikets=await this.tiketService.getAllTiketInPas(passageId);
            this.ok(res,tikets);
        }catch(e){
            return next(e) 
        }
    }
}