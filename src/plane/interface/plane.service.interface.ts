import { Plane } from "@prisma/client";
import { PlaneM } from "../entities/plane.entity";


export interface IPlaneService{
    getAllPlane:()=>Promise<Omit<Plane,'id'>[]|null>;
    getPlaneById:(id:number)=>Promise<Plane|null>;
    createPlane:(entity:PlaneM)=>Promise<Plane|null>;
    updatePlane:(id:number,coeff:number)=>Promise<Plane|null>;
} 