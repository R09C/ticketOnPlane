import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { IConfigService } from './config.service.interface';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { TYPES } from '../TYPES';
import { ILoggerServise } from '../logger/logger.service.interface';

@injectable()
export class ConfigService implements IConfigService {
	private readonly config: DotenvParseOutput;

	constructor(@inject(TYPES.LoggerService) private loggerService: ILoggerServise) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.loggerService.error('[ConfigService] Не удалось прочитать .env файл');
		} else {
			this.loggerService.info('[ConfigService] Конфигурация загружена');
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	get(key: string): string {
		return this.config[key];
	}
}