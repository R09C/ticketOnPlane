import { Place_Category } from "@prisma/client";
import { PlaceM } from "./entities/place.entity";
import { IPlaceRepository } from "./interface/place.repository.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "../TYPES";
import { PrismaService } from "../database/prisma.service";
import 'reflect-metadata';



injectable()
export class PlaceRepository implements IPlaceRepository{
    constructor(@inject(TYPES.PrismaService) private prismaService:PrismaService){}

    async createPlaceGroup({planeId,place,tiket_CategoryId}:PlaceM):Promise<Place_Category|null>{
        return this.prismaService.client.place_Category.create({
            data:{
                planeId,
                place,
                tiket_CategoryId,
            }
        });    
    }

    async getPlaceGroup(id:number):Promise<Place_Category|null>{
        return this.prismaService.client.place_Category.findFirst({
            where:{id}
        });
    }

    async getAllInPlane(planeId:number):Promise<Omit<Place_Category,"id">[]|null>{
        return this.prismaService.client.place_Category.findMany({
            where:{planeId}
        });
    }

}