import { inject, injectable } from "inversify";
import { TYPES } from "../TYPES";
import { PrismaService } from "../database/prisma.service";
import { Plane } from "@prisma/client";
import { PlaneM } from "./entities/plane.entity";
import 'reflect-metadata';
import { IPlaneService } from "./interface/plane.service.interface";
import { IPlaneRepository } from "./interface/plane.repository.interface";

@injectable()
export class PlaneService implements IPlaneService{
    constructor(@inject(TYPES.PlaneRepository) private planeRepository:IPlaneRepository){}

    async getAllPlane():Promise<Omit<Plane,'id'>[]|null>{
        return this.planeRepository.getAllPlane();
    }

    async getPlaneById(id:number):Promise<Plane|null>{
        return this.planeRepository.getPlaneById(id);
    }

    async createPlane({name,coeff,place}:PlaneM):Promise<Plane|null>{
        const entityPlane= new PlaneM(
            name,
            coeff,
            place,
        )
        if(!entityPlane) return null;
        return this.planeRepository.createPlane(entityPlane); 
    }

    async updatePlane(id:number,coeff:number):Promise<Plane|null>{
        const planeInfo=await this.getPlaneById(id);
        if(!planeInfo) return null;
        const entityPlane= new PlaneM(
            planeInfo.name,
            planeInfo.coeff,
            planeInfo.place,
        ).changeCoeff(coeff)
        return this.planeRepository.updatePlane(id,entityPlane);
    }
}