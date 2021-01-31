import { BusinessException } from "../exception/business.exception";
import { SystemException } from "../exception/system.exception";
import { IHttpResponse } from "./http-response";

/**
 * Classe auxiliar
 */
export class RestResponse {

    /**
     * Constante de codigo de erro padrao de negocio
     */
    public static CODIGO_NEGOCIO_SUCESSO: number = 0;

    /**
     * Constante de codigo de erro padrao para problema de sistema
     */
    public static CODIGO_ERRO_SISTEM_GENERICO: number = -1;

    /**
     * Retorno de sucesso para o solicitante
     * @param conteudo O que se deseja enviar para o usuario
     */
    static ok(conteudo: any): IHttpResponse{
        const retorno: IHttpResponse = {
            codigo: this.CODIGO_NEGOCIO_SUCESSO,
            conteudo: (conteudo ? conteudo : '')
        };
        return retorno;
    }

    /**
     * Retorna um erro negocial para o solicitante
     * @param codigo Codigo negocial que se deseja enviar para o cliente
     * @param conteudo Dado util que se deseja enviar para o usuario
     */
    static erroNegocio(codigo: number, conteudo: any): IHttpResponse {
        const retorno: IHttpResponse = {
            codigo: codigo, 
            conteudo: (conteudo ? conteudo : '')
        };
        return retorno;
    }

    /**
     * Retorna um erro de sistema para o solicitante
     * @param codigo Codigo de erro sistemico que se deseja enviar para o cliente
     * @param conteudo Dado util que se deseja enviar para o usuario
     */
    static erroSistema(codigo: number, conteudo: any): IHttpResponse {
        const retorno: IHttpResponse = {
            codigo: codigo, 
            conteudo: (conteudo ? conteudo : '')
        };
        return retorno;
    }
    
    /**
     * Retorna um erro de acordo com o tipo de escecao
     * @param exception Erro
     */
    static erro(exception: Error): IHttpResponse {
        if(exception instanceof BusinessException){
            const error: BusinessException = exception as BusinessException;
            return this.erroNegocio(
                error.codigoNegocio, 
                error.mensagem)
        }else if(exception instanceof SystemException){
            const error: SystemException = exception as SystemException;
            return this.erroNegocio(
                error.codigoNegocio, 
                error.mensagem)
        }else{
            return this.erroSistema(this.CODIGO_ERRO_SISTEM_GENERICO, 
                'Erro não mapeado.');
        }
    }    
}