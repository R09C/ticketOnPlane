import{User} from '@prisma/client';
import{UserM} from '../entities/user.entity';

export interface IUserRepository{
    getAllUser:()=>Promise<Omit<User,'password'|'role'|'salt'>[]>;
    getAllUserByEmail:(email:string)=>Promise<User|null>;
    getAllUserByID:(id:number)=>Promise<User|null>;
    createUser:(user:UserM)=>Promise<User>;
    changeUser:(data:UserM)=>Promise<User|null>;
}