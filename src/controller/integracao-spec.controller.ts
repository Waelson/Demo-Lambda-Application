import { Body, Controller, Logger, Post, Res } from "@nestjs/common";
import { ReqFormAutenticacaoDto } from "../dto/req-form-autenticacao.dto";
import { IntegracaoSpecService } from "../service/integracao-spec.service";
import { BaseController } from "./base.controller";
import { Response } from 'express';
import { BusinessException } from "../infra/exception/business.exception";

@Controller("api/v1/integracao-api-spec")
export class IntegracaoSpecController extends BaseController {

    /**
     * Constante de metodo de autenticacao
     */
    private readonly METODO_AUTENTICACAO: string = 
            "IntegracaoSpecController.autenticar";

    /**
     * Logger
     */
    private readonly logger = new Logger(IntegracaoSpecController.name);

    /**
     * Construtor
     * @param integracaoSpecService Servico de Integracao com a API Spec
     */
    constructor(
        private integracaoSpecService: IntegracaoSpecService){
        super();
    }

    /**
     * Processa a requisicao de autenticacao
     * @param login AutenticacaoReqTokenDto
     * @param res Response (Express)
     */
    @Post()
    async autenticar(@Body() login: ReqFormAutenticacaoDto, 
        @Res() res: Response) {
        try{
            this.logger.log('Dados recebido: ' + JSON.stringify(login), 
                this.METODO_AUTENTICACAO);

            if(!login){
                throw new BusinessException(0, 'Dados de login nao enviado.');
            }

            if(login && !login.email){
                throw new BusinessException(0, 'Parametro e-mail nao informado.');
            }

            if(login && !login.email){
                throw new BusinessException(0, 'Parametro senha nao informado.');
            }            

            const retorno = await this.integracaoSpecService.autenticar(
                login.email, login.senha);            
            this.ok(res, retorno);
        }catch(ex){
            this.error(res, ex, this.METODO_AUTENTICACAO);
        }
    }


}