import { ContainerModule, interfaces } from "inversify";
import { IPassageRepository } from "./interface/passage.repository.interface";
import { TYPES } from "../TYPES";
import { PassageRepository } from "./passage.repository";
import { PassageService } from "./passage.service";
import { IPassageService } from "./interface/passage.service.interface";
import { IPassageController } from "./interface/passage.controller.interface";
import { PassageController } from "./passage.controller";

export const PassageBindings=new ContainerModule ((bind:interfaces.Bind)=>{
    bind<IPassageRepository>(TYPES.PassageRepository).to(PassageRepository);    
    bind<IPassageService>(TYPES.PassageService).to(PassageService);    
    bind<IPassageController>(TYPES.PassageController).to(PassageController);    



});