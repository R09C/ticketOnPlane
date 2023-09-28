export class PassageM{
    constructor(
        private _from:string,
        private _to:string,
        private _timefrom:Date,
        private _timeto:Date,
        private _purchased:number,
        private _planeId:number|null,
    ){}

    get from():string{
        return this._from; 
    }

    get to():string{
        return this._to; 
    }

    get timefrom():Date{
        return this._timefrom; 
    }

    get timeto():Date{
        return this._timeto; 
    }

    get purchased():number{
        return this._purchased; 
    }

    get planeId():number|null{
        return this._planeId; 
    }

    changePassage(purchased:number):PassageM{
        this._purchased=purchased;
        return this;
    }
}