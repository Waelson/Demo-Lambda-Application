import { HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { BusinessException } from '../infra/exception/business.exception';
import { RestResponse } from '../infra/http/rest-response';

/**
 * Super-classe de todos os controllers
 */
export abstract class BaseController {

    /**
     * Logger
     */
    private readonly log = new Logger(BaseController.name);

    /**
     * Devolve uma resposta de sucesso com codigo HTTP 200
     * @param res Response
     * @param conteudo any
     */
    protected ok(res: Response, conteudo: any){
        const retorno = RestResponse.ok(conteudo);
        res.status(HttpStatus.OK).json(retorno);
    }

    /**
     * Devolve uma resposta de erro com codigo HTTP dependendo
     * do tipo da excecao: Error e SystemException - 500 / 
     * BusinessException - 400
     * 
     * @param res Response
     * @param exception (Error / BusinessException / SystemException)
     * @param metodo string
     */
    protected error(res: Response, exception: any, metodo: string){
        this.log.error(exception, exception.stack, metodo);
        const retorno = RestResponse.erro(exception);
        let httpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        if(exception instanceof BusinessException){
            httpStatusCode = HttpStatus.BAD_REQUEST;
        }
        res.status(httpStatusCode).json(retorno);
    }    
}