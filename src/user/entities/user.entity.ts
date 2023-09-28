import {compare,hash} from 'bcryptjs';
import {Role, User} from '@prisma/client';


export class UserM{
    private _password:string;
    constructor(
                private _salt:number,
                private  _email:string,
                private readonly _role:Role,
                _passwordHash='',
        ){
            this._password=_passwordHash;
        }
        get salt():number{
            return this._salt;
        }
        get email():string{
            return this._email;
        }
        get password():string{
            return this._password;
        }
        public async setPassword(pass:string,salt:number):Promise<void>{
            this._password=await hash(pass,salt);
        }
        public async camparePassword(pass:string):Promise<boolean>{
            return compare(pass,this._password)
        }
        public changeProfile(email:string):UserM{
            this._email=email;
            return this;
        }
        
        
    }