

/**
 * Erro que representa um problema relacionado 
 * ao negocio
 */
export class BusinessException extends Error{

    /**
     * Tipo do erro
     */
    public readonly tipoErro: string = "NEGOCIAL";

    /**
     * Construtor
     * @param codigoNegocio Codigo de negocio interno
     * @param mensagem Mensagem de negocio
     */
    constructor(
        public codigoNegocio: number, 
        public mensagem: string){
        super(mensagem); 
    }
    

}