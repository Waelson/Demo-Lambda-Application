import { Injectable, Logger } from "@nestjs/common";
import { StringUtil } from "../util/string.util";
import { TokenProxyDto } from "../dto/token-proxy.dto";
import { BusinessException } from "../infra/exception/business.exception";
import { ApiSpecProxy } from "../proxy/api-spec.proxy";

@Injectable()
export class IntegracaoSpecService {

    private readonly logger = new Logger(IntegracaoSpecService.name);

    /**
     * Construtor
     * @param apiSpecProxy ApiSpecProxy
     */
    constructor(private apiSpecProxy: ApiSpecProxy){}

    /**
     * Realiza a autenticacao
     * @param login AutenticacaoReqTokenDto
     */
    async autenticar(email: string, senha: string) {
        if(StringUtil.isVazia(email)){
            throw new BusinessException(0, 
                'O valor do e-mail nao foi informado.');
        }

        if(StringUtil.isVazia(senha)){
            throw new BusinessException(0, 
                'O valor da senha nao foi informado.');
        }                

        const resultadoRequest = await this.apiSpecProxy.autenticar(
            email, senha).toPromise();
        const dto:TokenProxyDto = resultadoRequest.data;

        if(dto.sucesso != 0){
            throw new BusinessException(2, 'E-mail e/ou senha invalido.');
        }

        return dto;

    }

}