import 'reflect-metadata';
import { NextFunction, Request, Response} from "express";
import { ITiketCategoryController } from './interface/tiket.category.controller.interface';
import { id, inject, injectable } from 'inversify';
import { ITiketCategoryService } from './interface/tiket.category.service.interface';
import { TYPES } from '../TYPES';
import { CategoryTiketM } from './entities/entity.category';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../erors/http-error.class';
import { IMiddleware } from '../common/Middleware.interface';
import { AuthGvards } from '../guards/auth.guard';


@injectable()
export class TiketCategoryController extends BaseController implements ITiketCategoryController{
    constructor(
        @inject(TYPES.TiketCategoryService) private tiketCategoryService:ITiketCategoryService,
        @inject(TYPES.AuthMiddleware) private authMiddleware:IMiddleware
        )
    {
        super();
        this.bindRoutes([
            {
               path:'/:id', 
               method:'get', 
               func:this.getInfo,
               middlewares:[this.authMiddleware], 
            },
            {
               path:'/update', 
               method:'put', 
               func:this.udateCategory,
               middlewares:[this.authMiddleware,new AuthGvards('ADMIN')], 
            },
            {
               path:'/create', 
               method:'post', 
               func:this.createCategory,
               middlewares:[this.authMiddleware,new AuthGvards('ADMIN')], 
            },

        ]);
    }

    async getInfo(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            const categoryId=Number(req.params.id);
            if (!categoryId) return next (new HTTPError(422,"некорректный запрос"))
            const category=await this.tiketCategoryService.getById(categoryId);
            if (!category) return next (new HTTPError(422,"некорректный запрос"))   
            this.ok(res,category);
        }catch(e) {
            return next(e)
        }  

    }

    async udateCategory(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            const id=Number(req.body.id);
            const coeff=Number(req.body.coeff);
            if (!id||!coeff) return next (new HTTPError(422,"некорректный запрос"))
            const category=await this.tiketCategoryService.udateCategory(id,coeff);
            if(!category) return next(new HTTPError(422,"некорректный запрос"))
            this.ok(res,category);
        }catch(e){
            return next(e)
        }
    }

    async createCategory({body}:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            if (!body) return next (new HTTPError(422,"некорректный запрос"));
            const category=await this.tiketCategoryService.createCategory(body);
            if (!category) return next (new HTTPError(422,"некорректный запрос"));
            this.ok(res,category);
        }catch(e){
            return next(e); 
        }
    }   


}