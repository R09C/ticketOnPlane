import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "../TYPES";
import { IPlaceRepository } from "./interface/place.repository.interface";
import { PlaceRepository } from "./palce.repository";
import { IPlaceService } from "./interface/place.service.interface";
import { PlaceService } from "./place.service";
import { IPlaceController } from "./interface/place.controller.interface";
import { PlaceController } from "./place.controller";

export const PlaceBindings=new ContainerModule ((bind:interfaces.Bind)=>{
    bind<IPlaceRepository>(TYPES.PlaceRepository).to(PlaceRepository);
    bind<IPlaceService>(TYPES.PlaceService).to(PlaceService);
    bind<IPlaceController>(TYPES.PlaceController).to(PlaceController);


});