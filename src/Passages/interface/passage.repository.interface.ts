import {Passage} from "@prisma/client";
import {PassageM} from "../entities/passage.entity"
export interface IPassageRepository{
    CreatePassage:(body:PassageM)=>Promise<Passage>;
    GetAllPassage:()=>Promise<Omit<Passage,'from'|'to'|'timefrom'|'timeto'|'planeId'>[]>;
    GetIdPassage:(id:number)=>Promise<Passage|null>;
    ChangePassage:(id:number,body:PassageM)=>Promise<Passage|null>;
}