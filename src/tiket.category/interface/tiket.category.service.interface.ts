import { Tiket_Category } from "@prisma/client";
import { CategoryTiketM } from "../entities/entity.category";

export interface ITiketCategoryService{
    udateCategory:(id:number,coeff:number)=>Promise<Tiket_Category|null>;
    getById:(id:number)=>Promise<Tiket_Category|null>;
    createCategory:(body:CategoryTiketM)=>Promise<Tiket_Category|null>;
}