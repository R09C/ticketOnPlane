import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "../TYPES";
import { AuthService } from "./auth.service";
import { IAuthService } from "./interface/auth.service.interface";
import { IAuthController } from "./interface/auth.controller.intreface";
import { AuthController } from "./auth.controller";
import { AuthMiddleware } from "../middlewares/auth.middlewares";

export const AuthBindings=new ContainerModule ((bind:interfaces.Bind)=>{
    bind<IAuthService>(TYPES.AuthService).to(AuthService);
    bind<IAuthController>(TYPES.AuthController).to(AuthController);
    bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);

});