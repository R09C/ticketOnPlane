import{User} from '@prisma/client';
import { ChangeProfileDto } from '../dtos/udate.user.dto';

export interface IUserService{
    getAllUser:()=>Promise<Omit<User,'password'|'role'|'salt'>[]>;
    getAllUserByID:(id:number)=>Promise<User|null>;
    changeUser:(id:number,data:ChangeProfileDto)=>Promise<User|null>;
}