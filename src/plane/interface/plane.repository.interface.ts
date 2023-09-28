import { Plane } from "@prisma/client";
import { PlaneM } from "../entities/plane.entity";


export interface IPlaneRepository{
    getAllPlane:()=>Promise<Omit<Plane,'id'>[]|null>;
    getPlaneById:(id:number)=>Promise<Plane|null>;
    createPlane:({name,coeff}:PlaneM)=>Promise<Plane|null>;
    updatePlane:(id:number,{coeff}:PlaneM)=>Promise<Plane|null>;
} 