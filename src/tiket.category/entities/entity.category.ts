import { Category } from "@prisma/client";

export class CategoryTiketM{
    constructor(
        private _name:Category,
        private _coeff:number,
    ){}

    get name():Category{
        return this._name
    } 

    get coeff():number{
        return this._coeff 
    } 

    changeCoeff(coeff:number):CategoryTiketM{
        this._coeff=coeff;
        return this
    }

}