import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';


@Injectable()
export class LogRequestMiddleware implements NestMiddleware {

    private readonly logger = new Logger(LogRequestMiddleware.name)

    use(req: Request, res: Response, next: NextFunction) {
        this.logger.log(`[${req.method} ${req.originalUrl}] Processando requisicao.`, 'LogRequestMiddleware.use')
        next();
        
    }

}