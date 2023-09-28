export class PlaceM{
    constructor(
       private _planeId:number,
       private _place:number,
       private _tiket_CategoryId:number,
    ){}

    get planeId():number{
        return this._planeId;
    }

    get place():number{
        return this._place;
    }

    get tiket_CategoryId():number{
        return this._tiket_CategoryId;
    }

    

}