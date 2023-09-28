import { inject, injectable } from "inversify";
import { ITiketCategoryRepository } from "./interface/tiket.category.repository.interface";
import { TYPES } from "../TYPES";
import { PrismaService } from "../database/prisma.service";
import { Tiket_Category,Category } from "@prisma/client";
import { CategoryTiketM } from "./entities/entity.category";
import 'reflect-metadata';


@injectable()
export class TiketCategoryRepository implements  ITiketCategoryRepository{
    constructor(@inject(TYPES.PrismaService) private prismaService:PrismaService){}

    async udateCategory(id:number,{coeff}:CategoryTiketM):Promise<Tiket_Category|null>{
        return this.prismaService.client.tiket_Category.update({
            where:{
                id
            },
            data:{
                coeff
            }
        });
    }

    async getById(id: number):Promise<Tiket_Category | null>{
        return this.prismaService.client.tiket_Category.findFirst({
            where:{
                id
            }
        });  
    }

    async createCategory({name,coeff}: CategoryTiketM):Promise<Tiket_Category | null>{
        return this.prismaService.client.tiket_Category.create({
            data:{
                name,
                coeff,
            }
        });
    }

}