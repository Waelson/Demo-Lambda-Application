import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { Express } from 'express';
import * as helmet from 'helmet';
import { Logger } from '@nestjs/common';
import { Client } from 'pg';
import { LoggingInterceptor } from './infra/interceptor/loggin.interceptor';
import { StringUtil } from './util/string.util';



export async function createApp(expressApp: Express): Promise<INestApplication> {

  const logger = new Logger('createApp');

  const opt = {
    user: process.env.SURFBANK_DB_USUARIO,
    database: process.env.SURFBANK_DB_BANCO,
    password: process.env.SURFBANK_DB_SENHA,
    port: parseInt(process.env.SURFBANK_DB_PORTA),
    host: process.env.SURFBANK_DB_HOST,
    connectionTimeoutMillis: 2000
  };
  const a = new Client(opt);

  try{
    logger.log('Conectando ao banco de dados.', 'app.createApp');
    await a.connect();
    logger.log('Conectou ao banco OK.');
  }catch(err){
    logger.error('Ocorreu um erro ao conectar ao banco de dados', 
    'app.createApp');
    logger.log(opt);
    logger.error(err);
  }finally{
    a.end();
  }
  
  logger.log('Padding: ' + StringUtil.padLeft('123', '0', 10));

  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

  app.useGlobalInterceptors(new LoggingInterceptor())

  //Habilita o CORS
  app.enableCors();

  //Utiliza o helmet para proteger de vulnerabilidades HTTP
  app.use(helmet());

  return app;
}