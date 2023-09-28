import { Tiket } from "@prisma/client";
import { TiketGroupM } from "../entities/tiketGroup.entity";

export interface ITiketService{
    getTiketById:(id: number)=>Promise<Tiket | null>;
    createTiketsGroup:(quantity:number,entity: TiketGroupM)=>Promise<{count:number} | null>;
    buyTiket:(id: number,basketId:number)=>Promise<Tiket|null>;
    getAllTiketInPas:(passageId:number)=>Promise<Tiket[]|null>;
}