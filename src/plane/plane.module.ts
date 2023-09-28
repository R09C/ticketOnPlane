import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "../TYPES";
import { IPlaneRepository } from "./interface/plane.repository.interface";
import { PlaneRepository } from "./plane.repository";
import { IPlaneService } from "./interface/plane.service.interface";
import { IPlaneController } from "./interface/plane.controller.interface";
import { PlaneController } from "./plane.controller";
import { PlaneService } from "./plane.service";

export const PlaneBindings=new ContainerModule ((bind:interfaces.Bind)=>{
    bind<IPlaneRepository>(TYPES.PlaneRepository).to(PlaneRepository);
    bind<IPlaneService>(TYPES.PlaneService).to(PlaneService);
    bind<IPlaneController>(TYPES.PlaneController).to(PlaneController);


});