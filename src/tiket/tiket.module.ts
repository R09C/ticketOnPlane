import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "../TYPES";
import { ITiketRepository } from "./interface/tiket.repository.interface";
import { TiketRepository } from "./tiket.repository";
import { ITiketService } from "./interface/tiket.service.interface";
import { TiketService } from "./tiket.service";
import { TiketController } from "./tiket.controller";
import { ITiketController } from "./interface/tiket.controller.interface";


export const TiketBindings=new ContainerModule ((bind:interfaces.Bind)=>{
    bind<ITiketRepository>(TYPES.TiketRepository).to(TiketRepository);    
    bind<ITiketService>(TYPES.TiketService).to(TiketService);    
    bind<ITiketController>(TYPES.TiketController).to(TiketController);    



});