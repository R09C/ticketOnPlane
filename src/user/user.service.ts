import{IUserService} from './/interface/user.service.interface';
import { inject,injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../TYPES';
import { IUserRepository } from './interface/user.repository.interface';
import{Role, User} from '@prisma/client';
import { ChangeProfileDto } from './dtos/udate.user.dto';
import { UserM } from './entities/user.entity';





@injectable()
export class UserService implements IUserService {
    constructor(@inject(TYPES.UserRepository) private userRepository:IUserRepository){}
    
    async getAllUser():Promise<Omit<User,'password'|'role'|'salt'>[]>{
        return this.userRepository.getAllUser();
    }
    async getAllUserByID(id:number):Promise<User|null>{
        return this.userRepository.getAllUserByID(id);
    }
 
    async changeUser(id:number,{email}:ChangeProfileDto): Promise<User|null>{
        const userFromDB=await this.userRepository.getAllUserByID(id);
        if(!userFromDB) return null;
        const changeUser1=new UserM(
            userFromDB.salt,
            userFromDB.email,
            userFromDB.role,
            ).changeProfile(email);
            return this.userRepository.changeUser(changeUser1)

    }

}