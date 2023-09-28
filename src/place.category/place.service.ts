import { inject, injectable } from "inversify";
import { IPlaceService } from "./interface/place.service.interface";
import { TYPES } from "../TYPES";
import { IPlaceRepository } from "./interface/place.repository.interface";
import 'reflect-metadata';
import { Place_Category } from "@prisma/client";
import { PlaceM } from "./entities/place.entity";

@injectable()
export class PlaceService implements IPlaceService{

    constructor(@inject(TYPES.PlaceRepository) private placeRepository:IPlaceRepository){}

    async createPlaceGroup({planeId,place,tiket_CategoryId}:PlaceM):Promise<Place_Category|null>{
        const entityPG= new PlaceM(
            planeId,
            place,
            tiket_CategoryId,
        )
        if(!entityPG) return null;
        return this.placeRepository.createPlaceGroup(entityPG);
    }

    async getPlaceGroup(id:number):Promise<Place_Category|null>{
        return this.placeRepository.getPlaceGroup(id);

    }

    async getAllInPlane(planeId:number):Promise<Omit<Place_Category,"id">[]|null>{
        return this.placeRepository.getAllInPlane(planeId);
    }
}