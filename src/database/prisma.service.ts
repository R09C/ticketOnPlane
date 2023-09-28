import{PrismaClient} from '@prisma/client';
import 'reflect-metadata';
import{inject,injectable} from 'inversify';
import { TYPES } from '../TYPES';
import { ILoggerServise } from '../logger/logger.service.interface';

@injectable()
export class PrismaService{
    client:PrismaClient;

    constructor(@inject(TYPES.LoggerService) private loggerService:ILoggerServise){
        this.client=new PrismaClient();
    }

    async connect():Promise<void>{
        try{
            await this.client.$connect();
            this.loggerService.info('[DataBaseService] Соединение с БД установлено');
        }catch(e){
            if (e instanceof Error)
				this.loggerService.error('[DataBaseService] Не удалось подключиться к БД');

        }
    }
    async disconnect():Promise<void>{
     await this.client.$disconnect();   
    }
}