import{Router,Response,IRouter} from 'express';
import{injectable} from 'inversify';
import 'reflect-metadata';
import{ILoggerServise} from '../logger/logger.service.interface';
import {ExpressReturnType,IControllerRouter} from "./router.interface";

@injectable()
export abstract class BaseController{
    private readonly _router:Router;


    constructor(){
        this._router=Router();

    }

    get router():IRouter{
        return this._router;
    }

    public send<T>(res:Response,code:number,message:T):ExpressReturnType{
        res.type('application/json');
        return res.status(code).json(message);
    }

    public ok<T>(res:Response,message:T):ExpressReturnType{
        return this.send<T>(res,200,message);

    }
    public created(res:Response):ExpressReturnType{
        return res.sendStatus(201);

    }

    protected bindRoutes(routes:IControllerRouter[]):void{
        for(const route of routes){
            const middlewares=route.middlewares?.map((m)=>m.execute.bind(m));
            const handler=route.func.bind(this);
            const pipeline=middlewares?[...middlewares,handler]:handler;
            this.router[route.method](route.path,pipeline);
        }
    }
}