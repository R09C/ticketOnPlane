import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "./TYPES";
import { App } from "./app";
import { PrismaService } from "./database/prisma.service";
import { IExeptionFilter } from "./erors/exeption.filter.interface";
import { ExeptionFilter } from "./erors/exption.filer";
import { LoggerService } from "./logger/logger.service";
import { ILoggerServise } from "./logger/logger.service.interface";
import { IConfigService } from "./config/config.service.interface";
import { ConfigService } from "./config/config.service";


export const AppBindings=new ContainerModule ((bind:interfaces.Bind)=>{
    bind<ILoggerServise>(TYPES.LoggerService).to(LoggerService).inSingletonScope();
    bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);    
    bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();    
    bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();      
    bind<App>(TYPES.Application).to(App);
});