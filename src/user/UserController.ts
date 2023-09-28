import{IUserController}from './interface/UserController.interface';
import {Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import {BaseController} from '../common/base.controller';
import { TYPES } from '../TYPES';
import {ILoggerServise} from '../logger/logger.service.interface';
import {inject,injectable} from 'inversify';
import { HTTPError } from '../erors/http-error.class';
import { IMiddleware } from '../common/Middleware.interface';
import { ValidadteMiddleware } from '../middlewares/validate.middleware';
import { ChangeProfileDto } from './dtos/udate.user.dto';
import { IUserService } from './interface/user.service.interface';


@injectable()
export class UserController extends BaseController implements IUserController{
    constructor(
        @inject(TYPES.LoggerService) private loggerService:ILoggerServise,
        @inject(TYPES.AuthMiddleware) private authMiddleware:IMiddleware,
        @inject(TYPES.UserService) private userService:IUserService,
    ){
        super();
        this.bindRoutes([
            {
                path:'/',
                method:'get',
                func:this.getAllUsers, 
            },
            {
                path:'/:id',
                method:'get',
                func:this.getUsersInfo, 

            },
            {
                path:'/update',
                method:'put',
                func:this.changeProfile, 
                middlewares:[this.authMiddleware,new ValidadteMiddleware(ChangeProfileDto)],
            },
        ]);
    }
    async getAllUsers(req: Request, res: Response, next: NextFunction):Promise<void>{
        try{
            const users=await this.userService.getAllUser();
            this.ok(res,users);

        }catch(e){
            return next(e)
        }   
     }
     async getUsersInfo(req: Request, res: Response, next: NextFunction):Promise<void>{
        try{
            const userId=Number(req.params.id)
            if(!userId){
                return next(new HTTPError(422,'Некорректный запрос'))
            }
            const user=await this.userService.getAllUserByID(userId);
            this.ok(res,user);

        }catch(e){
            return next(e)
        }   
     }
     async changeProfile(req: Request<{},{},ChangeProfileDto>, res: Response, next: NextFunction):Promise<void>{
        try{
            const userId=Number(req.user.id);
            const user=await this.userService.changeUser(userId,req.body);
            if(!user) return next(new HTTPError(400,'Пользователь с данным id не найден'));
            const getUser=await this.userService.getAllUserByID(user.id)
            this.ok(res,getUser);

        }catch(e){
            return next(e)
        }   
     }


}