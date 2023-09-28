import { Tiket_Category } from "@prisma/client";
import { CategoryTiketM } from "../entities/entity.category";



export interface ITiketCategoryRepository{
    udateCategory:(id:number,{coeff}:CategoryTiketM)=>Promise<Tiket_Category|null>;
    getById:(id:number)=>Promise<Tiket_Category|null>;
    createCategory:({name,coeff}:CategoryTiketM)=>Promise<Tiket_Category|null>;
}