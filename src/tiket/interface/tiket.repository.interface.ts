import { Tiket } from "@prisma/client"
import { TiketGroupM } from "../entities/tiketGroup.entity";

export interface ITiketRepository{
    createTiketsGroup:(body:Omit<Tiket,"id">[])=>Promise<{count:number}|null>;
    getTiketById:(id:number)=>Promise<Tiket|null>;
    getAllTiketInPas:(passageId:number)=>Promise<Tiket[]|null>;
    buyTiket:(id:number,{basketId}:TiketGroupM)=>Promise<Tiket>;


}