import { IUserRepository } from "./interface/user.repository.interface";
import { User } from "@prisma/client";
import { inject,injectable } from "inversify";
import 'reflect-metadata';
import { TYPES } from "../TYPES";
import { PrismaService } from "../database/prisma.service";
import { UserM } from "./entities/user.entity";


@injectable()
export class UserRepository implements IUserRepository{
    constructor(@inject(TYPES.PrismaService) private prismaService:PrismaService){}
    
    async createUser({email,password,salt}: UserM):Promise<User>{
        return this.prismaService.client.user.create({
            data:{
                email,
                password,
                salt
            },
        });
    }

    async changeUser ({email}: UserM):Promise<User | null>{
        return this.prismaService.client.user.update({
            where:{email},
            data:{email},
        });
    }

    async getAllUser():Promise<Omit<User, "password" | "role"|"salt">[]>{
        return this.prismaService.client.user.findMany({
            select:{
                id:true,
                email:true,
            },
        });
    }

    async getAllUserByEmail (email: string): Promise<User | null>{
        return this.prismaService.client.user.findFirst({
            where:{
                email
            }
        });  
    }

    async getAllUserByID (id: number): Promise<User | null>{
        return this.prismaService.client.user.findFirst({
            where:{
                id
            }
        });  
    }
}