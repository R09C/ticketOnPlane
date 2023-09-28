import { inject, injectable } from "inversify";
import { IPassageService } from "./interface/passage.service.interface";
import { TYPES } from "../TYPES";
import {Passage} from "@prisma/client";
import { PassageM } from "./entities/passage.entity";
import { IPassageRepository } from "./interface/passage.repository.interface";

@injectable()
export class PassageService implements IPassageService{
    constructor(@inject(TYPES.PassageRepository) private passageRepository:IPassageRepository){}

    async GetAllPassage():Promise<Omit<Passage,'from'|'to'|'timefrom'|'timeto'|'planeId'>[]>{
        return this.passageRepository.GetAllPassage();
    }

    async GetIdPassage(id: number):Promise<Passage | null>{
        return this.passageRepository.GetIdPassage(id);
    }

    async CreatePassage({from,to,timefrom,timeto,purchased,planeId}:PassageM):Promise<Passage>{
        const entityPassage=new PassageM(
            from,
            to,
            timefrom,
            timeto,
            purchased,
            planeId
        );

        return this.passageRepository.CreatePassage(entityPassage);
    } 

    async ChangePassage(id: number):Promise<Passage | null>{
        const passageFromDB=await this.passageRepository.GetIdPassage(id);
        if(!passageFromDB) return null;
        const userEntity= new PassageM(
            passageFromDB.from,
            passageFromDB.to,
            passageFromDB.timefrom,
            passageFromDB.timeto,
            passageFromDB.purchased,            
            passageFromDB.planeId,            
        ).changePassage(passageFromDB.purchased+1);
        return this.passageRepository.ChangePassage(id,userEntity)
    }
}