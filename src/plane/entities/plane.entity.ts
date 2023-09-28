export class PlaneM{
    constructor(
        private _name:string,
        private _coeff:number,
        private _place:number,
    ){}

    get name():string{
        return this._name;
    }

    get coeff():number{
        return this._coeff;
    }

    get place():number{
        return this._place;
    }

    changeCoeff(coeff:number):PlaneM{
        this._coeff=coeff;
        return this
    }

}