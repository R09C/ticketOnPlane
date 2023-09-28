import { Tiket_Category } from "@prisma/client";
import { CategoryTiketM } from "./entities/entity.category";
import { ITiketCategoryService } from "./interface/tiket.category.service.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "../TYPES";
import { ITiketCategoryRepository } from "./interface/tiket.category.repository.interface";
import 'reflect-metadata';

@injectable()
export class TiketCategoryService implements ITiketCategoryService{  

    constructor(@inject(TYPES.TiketCategoryRepository)private tiketCategoryRepository:ITiketCategoryRepository){}

    async  udateCategory(id:number,coeff:number):Promise<Tiket_Category|null>{
        const categoryInDB=await this.getById(id);
        if(!categoryInDB) return null;
        const entity=new CategoryTiketM(
            categoryInDB.name,
            categoryInDB.coeff,
        ).changeCoeff(coeff);
        return this.tiketCategoryRepository.udateCategory(id,entity);
    }

    async getById(id:number):Promise<Tiket_Category|null>{
        return this.tiketCategoryRepository.getById(id);
    }

    async createCategory({name,coeff}:CategoryTiketM):Promise<Tiket_Category|null>{
        const entity=new CategoryTiketM(
            name,
            coeff,
        );
        return this.tiketCategoryRepository.createCategory(entity);
    }

}