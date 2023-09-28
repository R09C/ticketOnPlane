import{Router, Request,Response, NextFunction} from 'express' ;
import {IMiddleware} from './Middleware.interface';



export interface IControllerRouter{
    path:string;
    func:(req:Request,res:Response,next:NextFunction)=> void;
    method:keyof Pick<Router,'get'|'post'|'delete'|'patch'|'put'>;
    middlewares?:IMiddleware[];

}
export type ExpressReturnType=Response<any,Record<string,any>>;