import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConnectionManager, getConnectionManager } from 'typeorm';
import { EnvsConfig } from '../config/envs.config';
import { ENTITIES } from '../../components';

/**
 * Servico que realiza as configuracoes com o banco de dados
 */
@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {

    private static TIPO_DATABASE: string = 'postgres';

    /**
     * Logger
     */
    private readonly logger = new Logger(TypeOrmConfigService.name);

    async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
        const connectionManager: ConnectionManager = getConnectionManager();
        let options: any;

        if (connectionManager.has('default')) {
            options = connectionManager.get('default').options;
            await connectionManager.get('default').close();
        } else {
            options = {
                keepConnectionAlive: true,
                type: TypeOrmConfigService.TIPO_DATABASE,
                host: EnvsConfig.getEnvDbHost(),
                username: EnvsConfig.getEnvDbUsuario(),
                password: EnvsConfig.getEnvDbSenha(),
                database: EnvsConfig.getEnvDbBanco(),
                port: EnvsConfig.getEnvDbPorta(),
                entities: ENTITIES,
                synchronize: true,
                logging: 'all'
            } as TypeOrmModuleOptions;
        }
        return options;
    }
}
