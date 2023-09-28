import{ILoggerServise} from '../logger/logger.service.interface';
import{TYPES} from '../TYPES';
import {HTTPError} from './http-error.class';
import {Request,NextFunction,Response} from 'express';
import{IExeptionFilter} from './exeption.filter.interface';
import{inject,injectable} from 'inversify';
import 'reflect-metadata';

@injectable()
export class ExeptionFilter implements IExeptionFilter{

    constructor(@inject(TYPES.LoggerService) private loggerService:ILoggerServise){}

    catch(err:Error|HTTPError,req:Request,res:Response,next:NextFunction):void{
        if(err instanceof HTTPError){
            this.loggerService.error(`[${err.context}] ${err.message}`);
            res.status(err.statusCode).send({ message: err.message });
        }else {
			this.loggerService.error(`[Internal server error] ${err}`);
			res.status(500).send({ message: 'Непредвиденная ошибка' });
        }
    }
}

