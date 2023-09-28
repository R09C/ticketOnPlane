import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "../TYPES";
import { ITiketCategoryRepository } from "./interface/tiket.category.repository.interface";
import { TiketCategoryRepository } from "./tiket.category.repository";
import { ITiketCategoryService } from "./interface/tiket.category.service.interface";
import { TiketCategoryService } from "./tiket.category.service";
import { ITiketCategoryController } from "./interface/tiket.category.controller.interface";
import { TiketCategoryController } from "./tiket.category.controller";



export const TiketBindings=new ContainerModule ((bind:interfaces.Bind)=>{
    bind<ITiketCategoryRepository>(TYPES.TiketCategoryRepository).to(TiketCategoryRepository);    
    bind<ITiketCategoryService>(TYPES.TiketCategoryService).to(TiketCategoryService);    
    bind<ITiketCategoryController>(TYPES.TiketCategoryController).to(TiketCategoryController);    



});