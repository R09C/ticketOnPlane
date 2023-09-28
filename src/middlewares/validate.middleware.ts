import { Request, Response, NextFunction } from "express";
import { IMiddleware } from "../common/Middleware.interface";
import { ClassConstructor,plainToClass } from "class-transformer";
import { validate } from "class-validator";



export class ValidadteMiddleware implements IMiddleware{
    constructor(private classToValidate:ClassConstructor<object>){}

    execute({body}: Request, res: Response, next: NextFunction): void{
        const instance=plainToClass(this.classToValidate,body);
        validate(instance).then((errors)=>{
            if(errors.length>0){
                const messsage=errors.pop()?.constraints;
                res.status(422).send({err:messsage});
            }else{
                next();
            }
        });
    }
}