import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller"
import { IPassageController } from "./interface/passage.controller.interface";
import { TYPES } from "../TYPES";
import { IPassageService } from "./interface/passage.service.interface";
import { IMiddleware } from "../common/Middleware.interface";
import { Request, Response, NextFunction } from "express";
import { HTTPError } from "../erors/http-error.class";
import { AuthGvards } from "../guards/auth.guard";


@injectable()
export class PassageController extends BaseController implements IPassageController{
    constructor(
        @inject(TYPES.PassageService) private passageService:IPassageService,
        @inject(TYPES.AuthMiddleware) private authMiddleware:IMiddleware,
    ){
        super();
        this.bindRoutes([
            {
                path:'/',
                method:'get',
                func:this.getAllPassage,
                middlewares:[this.authMiddleware]                

            },
            {
                path:'/create',
                method:'post',
                func:this.createPassage,
                middlewares:[this.authMiddleware,new AuthGvards('ADMIN')]                

            },
            {
                path:'/:id',
                method:'get',
                func:this.getPassageInfo,
                middlewares:[this.authMiddleware]               

            },
            {
                path:'/update:id',
                method:'put',
                func:this.changePassage,
                middlewares:[this.authMiddleware,new AuthGvards('ADMIN')]                

            },
        ]);
    }
    async getAllPassage(req: Request, res: Response, next: NextFunction):Promise<void>{
        try{
           const passage=await this.passageService.GetAllPassage();
           this.ok(res,passage);
        }catch(e){
            return next(e)
        }
    }

    async createPassage({body}: Request, res: Response, next: NextFunction):Promise<void>{
        try{
            if(!body) return next(new HTTPError(422,'Некорректный запрос'));
            const passage=await this.passageService.CreatePassage(body);
            this.ok(res,passage);
        }catch(e){
            return next(e) 
        }
    }
    async getPassageInfo(req: Request, res: Response, next: NextFunction):Promise<void>{
        try{
            const passageId=Number(req.params.id)
            if (!passageId) return next(new HTTPError(422,'Некорректный запрос'));
            const passage=await this.passageService.GetIdPassage(passageId);
            this.ok(res,passage);
        }catch(e){
            return next(e)
        }
    }
    
    async changePassage(req: Request, res: Response, next: NextFunction):Promise<void>{
        try{
            const passageId=req.body.passageId
            if (!passageId) return next(new HTTPError(422,'Некорректный запрос'));
            const passage= await this.passageService.ChangePassage(passageId);
            if(!passage) return next(new HTTPError(400,'рейс с таким id не найден'))
            const getPassage=await this.passageService.GetIdPassage(passage.id)
            this.ok(res,getPassage);

        }catch(e){
            return next(e)
        }
    }
} 