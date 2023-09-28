export class TiketGroupM{

    constructor(
        private _price:number,
        private _passageId:number,
        private _basketId:number|null=null,
        private _place_CategoryId:number,
        
    ){}
    
    get price():number{
        return this._price;
    }

    get passageId():number{
        return this._passageId;
    }

    get place_CategoryId():number{
        return this._place_CategoryId;
    }

    get basketId():number|null{
        return this._basketId;
    }

    changeAffiliation(basketId:number):TiketGroupM{
        this._basketId=basketId;
        return this;
    }
    coeffPrice(planeCoeff:number,categoryCoeff:number,popularity:number,sizonrate:number,place:number):TiketGroupM{
        this._price=this._price*planeCoeff*categoryCoeff*(1+(sizonrate-1)*(popularity/place));
        return this
    }

}