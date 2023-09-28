import {ILogObj,Logger} from 'tslog';
import {injectable} from 'inversify';
import 'reflect-metadata';
import{ILoggerServise}from './logger.service.interface'

@injectable()
export class LoggerService implements ILoggerServise{
    public logger:Logger<ILogObj>;
    constructor(){
        this.logger=new Logger({
            hideLogPositionForProduction:true,
        });
    }

error(...args:unknown[]):void{
    this.logger.error(...args);
}

info(massage:string):void{
    this.logger.info(massage);
}

warn(...args:unknown[]):void{
    this.logger.warn(...args)
}

} 
