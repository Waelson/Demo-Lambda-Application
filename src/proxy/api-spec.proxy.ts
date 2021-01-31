import { HttpService, Injectable, Logger } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { EnvsConfig } from "../infra/config/envs.config";
import { TokenProxyDto } from "../dto/token-proxy.dto";

/**
 * Classe utilizada como camada de abstracao para a API Spec
 */
@Injectable()
export class ApiSpecProxy {

    /**
     * Logger
     */
    private readonly logger = new Logger(ApiSpecProxy.name);

    /**
     * Construtor
     * @param httpService HttpService
     */
    constructor(private httpService: HttpService){}

    /**
     * Realiza a eutenticacao do usuario
     * @param email Email do usuario
     * @param senha Senha do usuario
     */
    autenticar(email: string, senha: string): 
                Observable<AxiosResponse<TokenProxyDto>> {
        const params = {
            email: email, 
            senha: senha
        };
        const retorno = this.httpService.post(
            `${EnvsConfig.getEnvSpecApiUrl()}/v1/auth`, params);
        return retorno;
    }



}