import { HttpModule, Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ConfigModule } from 'nestjs-config';
import { TypeOrmConfigService } from './infra/db/database';
import { CONTROLLERS, SERVICES, REPOSITORIES } from './components';


@Module({
  controllers: CONTROLLERS,
  providers: SERVICES,
  imports: [
    TypeOrmModule.forRootAsync(
      { 
        inject: [ConfigModule], useClass: TypeOrmConfigService
      }
    ),   
    TypeOrmModule.forFeature(REPOSITORIES),
    HttpModule
  ],
})
export class AppModule {}
