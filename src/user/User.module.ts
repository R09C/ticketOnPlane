import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "../TYPES";
import { UserController } from "./UserController";
import { IUserController } from "./interface/UserController.interface";
import { IUserRepository } from "./interface/user.repository.interface";
import { UserRepository } from "./user.repository";
import { IUserService } from "./interface/user.service.interface";
import { UserService } from "./user.service";

export const UserBindings=new ContainerModule ((bind:interfaces.Bind)=>{
    bind<IUserController>(TYPES.UserController).to(UserController);
    bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
    bind<IUserService>(TYPES.UserService).to(UserService);


});