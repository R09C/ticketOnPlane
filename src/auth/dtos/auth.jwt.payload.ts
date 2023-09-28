export interface AuthJwtPayload{
    readonly id:string;
    readonly email:string;
    readonly role:string;
    readonly salt:number;
}