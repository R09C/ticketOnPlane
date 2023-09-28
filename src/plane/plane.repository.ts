import { inject, injectable } from "inversify";
import { IPlaneRepository } from "./interface/plane.repository.interface";
import { TYPES } from "../TYPES";
import { PrismaService } from "../database/prisma.service";
import { Plane } from "@prisma/client";
import { PlaneM } from "./entities/plane.entity";
import 'reflect-metadata';

@injectable()
export class PlaneRepository implements IPlaneRepository{
    constructor(@inject(TYPES.PrismaService) private prismaService:PrismaService){}

    async getAllPlane():Promise<Omit<Plane,'id'>[]|null>{
        return this.prismaService.client.plane.findMany();
    }

    async getPlaneById(id:number):Promise<Plane|null>{
        return this.prismaService.client.plane.findFirst({
            where:{id}
        });
    }

    async createPlane({name,coeff}:PlaneM):Promise<Plane|null>{
        return this.prismaService.client.plane.create({
            data:{
                name,
                coeff
            }
        });
    }

    async updatePlane(id:number,{coeff}:PlaneM):Promise<Plane|null>{
        return this.prismaService.client.plane.update({
           where:{id},
           data:{coeff} 
        });
    }
}