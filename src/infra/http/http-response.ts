
/**
 * Classe que representa a resposta das requisicoes HTTP
 */
export interface IHttpResponse {

    /**
     * Codigo que sera enviado para o cliente
     */
    codigo: number;

    /**
     * Conteudo que sera enviado para o cliente
     */
    conteudo: any;

}