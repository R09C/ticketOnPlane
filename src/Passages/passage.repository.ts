import { Passage } from "@prisma/client";
import { PassageM } from "./entities/passage.entity";
import { IPassageRepository } from "./interface/passage.repository.interface";
import 'reflect-metadata';
import { inject, injectable } from "inversify";
import { PrismaService } from "../database/prisma.service";
import { TYPES } from "../TYPES";

@injectable()
export class PassageRepository implements IPassageRepository{
    
    constructor(@inject(TYPES.PrismaService) private prismaService:PrismaService,){}
    
    async CreatePassage({from,to,timefrom,timeto,purchased,planeId}: PassageM):Promise<Passage>{
        return this.prismaService.client.passage.create({
            data:{
                from,
                to,
                timefrom,
                timeto,
                purchased,
                planeId

            },
        });
        
    }
    
    async ChangePassage(id: number,{purchased}:PassageM):Promise<Passage | null>{
        return this.prismaService.client.passage.update({
            where:{id},
            data:{purchased},
        });
    }

    async GetAllPassage():Promise<Omit<Passage,'from'|'to'|'timefrom'|'timeto'|'planeId'>[]>{
        return this.prismaService.client.passage.findMany({
            select:{
                id:true,
                purchased:true,
            },
        });
    }

    async GetIdPassage(id: number):Promise<Passage | null>{
        return this.prismaService.client.passage.findFirst({
            where:{
                id
            },
        });
    }
    
}