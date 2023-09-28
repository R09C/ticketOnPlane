import { inject, injectable } from "inversify";
import { ITiketService } from "./interface/tiket.service.interface";
import { TYPES } from "../TYPES";
import { Tiket } from "@prisma/client";
import { ITiketRepository } from "./interface/tiket.repository.interface";
import { TiketGroupM } from "./entities/tiketGroup.entity";
import { IPassageRepository } from "../Passages/interface/passage.repository.interface";
import 'reflect-metadata';


@injectable()
export class TiketService implements ITiketService{
    constructor(
        @inject(TYPES.TiketRepository)private tiketRepository:ITiketRepository,
        @inject(TYPES.PassageRepository)private passageRepository:IPassageRepository,
    ){}

    async getTiketById(id: number):Promise<Tiket | null>{
        return this.tiketRepository.getTiketById(id)
    }

    async getAllTiketInPas(passageId: number):Promise<Tiket[] | null>{
        return this.tiketRepository.getAllTiketInPas(passageId)
    }

    async createTiketsGroup(quantity:number,entity: TiketGroupM):Promise<{ count: number; } | null>{
        const data=Array.from({length:quantity}).map(()=>({
            price:entity.price,
            basketId:entity.basketId,
            passageId:entity.passageId
        }));
        return this.tiketRepository.createTiketsGroup(data)
    }

    async buyTiket(id: number,basketId: number):Promise<Tiket|null>{
        const TiketInDB = await this.tiketRepository.getTiketById(id);
        if(!TiketInDB) return null;
        const tiketEntity=new TiketGroupM(
            TiketInDB.price,
            TiketInDB.passageId,
            TiketInDB.basketId,
        ).changeAffiliation(basketId);
        return this.tiketRepository.buyTiket(id,tiketEntity)

    }
}