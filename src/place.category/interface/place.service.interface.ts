import { Place_Category } from "@prisma/client";
import { PlaceM } from "../entities/place.entity";


export interface IPlaceService{
    createPlaceGroup:({planeId,place,tiket_CategoryId}:PlaceM)=>Promise<Place_Category|null>;
    getPlaceGroup:(id:number)=>Promise<Place_Category|null>;
    getAllInPlane:(planeId:number)=>Promise<Omit<Place_Category,"id">[]|null>;
}