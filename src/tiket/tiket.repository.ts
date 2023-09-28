import { Tiket } from "@prisma/client";
import { ITiketRepository } from "./interface/tiket.repository.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "../TYPES";
import { PrismaService } from "../database/prisma.service";
import { TiketGroupM } from "./entities/tiketGroup.entity";
import 'reflect-metadata';


@injectable()
export class TiketRepository implements ITiketRepository{
    constructor(@inject(TYPES.PrismaService) private prismaService:PrismaService){}
    
    async getTiketById(id: number):Promise<Tiket | null>{
        return this.prismaService.client.tiket.findFirst({
            where:{
                id
            }
        });
    }

    async getAllTiketInPas(PassageId: number):Promise<Tiket[] | null>{
        return this.prismaService.client.tiket.findMany({
            where:{
                passageId:PassageId,
            }
        });
    }
    
    async createTiketsGroup(body: Omit<Tiket,"id">[]):Promise<{count:number} | null>{
        return this.prismaService.client.tiket.createMany({
            data:body
        });
    }

    async buyTiket(id: number,{basketId}:TiketGroupM):Promise<Tiket>{
        return this.prismaService.client.tiket.update({
            where:{id},
            data:{basketId}
        });
    }
}