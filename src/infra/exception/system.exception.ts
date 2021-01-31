
/**
 * Erro que representa um problema de sistema
 */
export class SystemException extends Error{

    /**
     * Tipo do erro
     */
    public readonly tipoErro: string = "SISTEMA";

    public readonly codigoNegocio: number = 0;

    /**
     * Construtor
     * @param codigoNegocio Algum codigo Interno
     * @param mensagem Mensagem informativa
     */
    constructor(
        public mensagem: string){
        super(mensagem);        
    }
    

}